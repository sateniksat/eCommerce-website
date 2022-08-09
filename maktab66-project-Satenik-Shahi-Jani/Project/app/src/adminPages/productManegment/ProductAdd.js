import React, { useState,useEffect } from "react";
// import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  TextField,
  Box,
  InputLabel,
  Input,
  FormControl,
  Button,
  CardMedia,
  MenuItem,
  Select,
} from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ModalPage from "../../Components/ModalPage";
import { api } from "../../api/api";
import { useFetch } from "../../hooks/useFetch";

export function ProductAdd(props) {
  // const imgRef = useRef();
  // const preview = (file) => {
  //   const fileReader = new FileReader();

  //   fileReader.onload = (e) => {
  //     if (imgRef && imgRef.current) imgRef.current.src = e.target?.result;
  //   };
  //   fileReader.readAsDataURL(file);
  // };

  const { data } = useFetch("/category");

  const [product, setProduct] = useState({
    // description: "",
    // name: "",
    // price: "",
    // count: "",
    // brand: "",
    // category: "",
    // images: [],
    // thumbnail: "",
    // categoryName: "",
    //poster:""
  });
  const [selectCategory, setSelectCategory] = useState("");


useEffect(()=>{
  if(props.product.category){
    setSelectCategory(props.product.category)
  }
},[props])


  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    // console.log(product);
  };

  function handleChangeSelect(e) {
    setSelectCategory(e.target.value);
    // console.log(e.target)
    handleChangeInput(e);
    let test = "";
    data?.data.forEach((item) => {
      if (item.id === Number(e.target.value)) {
        test = item.name;
        // console.log(item.name);
        setProduct((prevState) => ({ ...prevState, categoryName: test }));
        // console.log(product);
      }
    });
  }

  const changeHanler = async (e) => {
    const files = Array.from(e.target.files);
    // preview(files[0]);
    // console.log(files);
    let temp = [];
    const formData = new FormData();
    files.forEach((item) => {
      formData.append("image", item);
      const tempRequest = api.post("/upload", formData, {
        headers: { token: localStorage.getItem("token") },
      });
      temp.push(tempRequest);
    });
    const arrayResponse = await Promise.all(temp);
    setProduct({
      ...product,
      [e.target.name]: arrayResponse.map((i) => i.data.filename),
    });
    // console.log(product);
  };

  const changeHanlerThumbnail = async (e) => {
    const files = Array.from(e.target.files);
    // preview(files[0]);
    // console.log(files);
    let tempThum = [];
    files.forEach((item) => {
      const formData = new FormData();
      formData.append("image", item);
      const tempRequest = api.post("/upload", formData);
      tempThum.push(tempRequest);
    });
    const arrayResponseThumb = await Promise.all(tempThum);
    // console.log(arrayResponseThumb);

    setProduct({
      ...product,
      [e.target.name]: arrayResponseThumb[0].data.filename,
    });
    // console.log(product);
  };

  const handleEditor = (event, editor) => {
    const data = editor.getData();
    setProduct({ ...product, description: data });
    // console.log(product);
  };
  const handleSendNewData = (e) => {
    e.preventDefault();

    (async () => {
      if (
        product.description === "" ||
        product.name === "" ||
        product.price === "" ||
        product.count === "" ||
        product.brand === "" ||
        product.categoryName === "" ||
        product.category === "" ||
        product.images === [] ||
        product.thumbnail === "" ||
        product.poster === ""
      ) {
        alert("لطفا تمام فیلد ها را پر کنید.");
      } else {
        setProduct({ ...product, createdAt: Date.now() });
        const response = await api.post("/products", product).then((res) => {
          // console.log(res.data);
          setProduct(res.data);
          return res;
        });
        // console.log(response?.data)
        if (response?.status === 200 || response?.status === 201) {
          // console.log("hi");
          // console.log(response?.data.data)
          // props.addingProduct(product);
          props.addingProduct(response?.data);
        } else {
          props.addingProduct();
        }

        // props.addingProduct();
        // console.log(product);
        props.handleClose();
      }
    })();
  };

  const handleEditData = (e) => {
    e.preventDefault();
    (async () => {
      const response = await api
        .patch(`/products/${props.product?.id}`, product, {
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => res);
      // console.log(response)
      if (response?.status === 200 || response?.status === 201) {
        props.handleProductEdit(response.data);
        // console.log("hellooo")
      } else {
        props.handleProductEdit();
      }
    })();
    // props.handleProductEdit()
    props.handleClose();
    props.setActivePage(props.activePage);
  };

  return (
    <form>
      <Box dir="rtl" sx={{ my: "4%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "48%" },
              alignContent: "center",
            }}
          >
            <TextField
              required
              sx={{ my: 2 }}
              id="outlined-required"
              label="نام کالا"
              name={"name"}
              onChange={(e) => handleChangeInput(e)}
              defaultValue={props.product?.name}
            />
            <TextField
              required
              id="outlined-required"
              label="قیمت"
              InputProps={{ inputProps: { min: 0 } }}
              type="number"
              name="price"
              sx={{ my: 2 }}
              onChange={(e) => handleChangeInput(e)}
              defaultValue={props.product?.price}
            />
            <TextField
              required
              id="outlined-required"
              label="موجودی"
              InputProps={{ inputProps: { min: 0 } }}
              name="count"
              type="number"
              onChange={(e) => handleChangeInput(e)}
              sx={{ my: 2 }}
              defaultValue={props.product?.count}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "48%" },
              alignContent: "center",
            }}
          >
            <TextField
              required
              sx={{ my: 2 }}
              id="outlined-required"
              label="برند"
              name="brand"
              onChange={(e) => handleChangeInput(e)}
              defaultValue={props.product?.brand}
            />
            <TextField
              required
              sx={{ my: 2 }}
              id="outlined-required"
              label="پستر"
              name="poster"
              onChange={(e) => handleChangeInput(e)}
              defaultValue={props.product?.poster}
            />
             <Box sx={{ my: 2 }}> 
              <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
                <Select
                  id="demo-simple-select"
                  label="دسته بندی"
                  name="category"
                  value={selectCategory}
                  required
                  defaultValue={props.product?.category}
                  onChange={(e) => handleChangeSelect(e)}
                >
                  {data?.data.map((item) => {
                    return (
                      <MenuItem dir="rtl" key={item.name} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box width="100%">
          {props.product && (
            <Box>
              <CardMedia
                component="img"
                alt="img"
                sx={{ width: { xs: "20%", md: "10%" }, mx: 1 }}
                image={`http://localhost:3002/files/${props.product.thumbnail}`}
              />
              {/* <Button
                variant="outlined"
                color="error"
                sx={{ mx: 1 }}
                onClick={() => handleDeletIMG(props.product.thumbnail)}
              >
                حذف
              </Button> */}
            </Box>
          )}
          {product.thumbnail && (
            <Box>
              <CardMedia
                component="img"
                alt="img"
                sx={{ width: { xs: "20%", md: "10%" }, mx: 1 }}
                image={`http://localhost:3002/files/${product.thumbnail}`}
              />
              {/* <Button
                variant="outlined"
                color="error"
                sx={{ mx: 1 }}
                onClick={() => handleDeletIMG(product.thumbnail)}
              >
                حذف
              </Button> */}
            </Box>
          )}
        </Box>
        <Box sx={{ p: 2, display: "flex" }}>
          <label>Thumbnail</label>
          <Input
            accept="image/*"
            id="thumbnail"
            name="thumbnail"
            type="file"
            onChange={changeHanlerThumbnail}
          />
        </Box>
        <Box width="100%" sx={{ display: "flex", flexWrap: "wrap" }}>
          {props.product &&
            props.product.images.map((item) => (
              <Box key={item} sx={{ width: { xs: "20%", md: "10%" }, mx: 1 }}>
                <CardMedia
                  component="img"
                  alt="img"
                  sx={{ width: "100%" }}
                  image={`http://localhost:3002/files/${item}`}
                />
                {/* <Button
                  variant="outlined"
                  color="error"
                  sx={{width:"100%" }}
                  onClick={() => handleDeletIMG(item)}
                >
                  حذف
                </Button> */}
              </Box>
            ))}
          {product.images &&
            product.images.map((item) => (
              <Box key={item} sx={{ width: { xs: "20%", md: "10%" }, mx: 1 }}>
                <CardMedia
                  component="img"
                  alt="img"
                  sx={{ width: "100%" }}
                  image={`http://localhost:3002/files/${item}`}
                />
                {/* <Button
                  variant="outlined"
                  color="error"
                  sx={{width:"100%" }}
                  onClick={() => handleDeletIMG(item)}
                >
                  حذف
                </Button> */}
              </Box>
            ))}
        </Box>
        <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <label htmlFor="contained-button-file">
            <label>Gallery</label>
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              name="images"
              onChange={changeHanler}
            />
          </label>
        </Box>
        <Box sx={{ width: "%100", display: "flex", justifyContent: "center" }}>
          <CKEditor
            style={{ width: "100%" }}
            editor={ClassicEditor}
            name="description"
            data={props.product?.description}
            onChange={(event, editor) => {
              handleEditor(event, editor);
            }}
          />
        </Box>
        <Box
          sx={{
            width: "%100",
            display: "flex",
            justifyContent: "center",
            my: 2,
          }}
        >
          {props.product ? (
            <Button
              variant="contained"
              color="success"
              onClick={(e) => handleEditData(e)}
              sx={{ width: "50%", mb: 3 }}
            >
              ویرایش
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ width: "50%", mb: 3 }}
              onClick={(e) => handleSendNewData(e)}
            >
              افزودن
            </Button>
          )}
        </Box>
      </Box>
    </form>
  );
}
export default ModalPage(ProductAdd);
