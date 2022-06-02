import React, { useState } from "react";
// import { useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  TextField,
  Box,
  InputLabel,
  Input,
  FormControl,
  Button,
} from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ModalPage from "../../components/ModalPage";
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

  const [product, setProduct] = useState({});
  const handleChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
    // console.log(product);
  };

  const changeHanler = async (e) => {
    const files = Array.from(e.target.files);
    // preview(files[0]);
    // console.log(files);
    let temp = [];
    files.map((item) => {
      const formData = new FormData();
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
    files.map((item) => {
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
    setProduct({ ...product, ["description"]: data });
    // console.log(product);
  };
  const handleSendNewData = (e) => {
    e.preventDefault();
    if(
      product.description === "" ||
      product.name === "" ||
      product.price === "" ||
      product.count === "" ||
      product.brand === "" ||
      product.category === "" ||
      product.images === "" ||
      product.thymbnail === ""
    ){
      alert("fill all feilds");
    }else{
      setProduct({ ...product, ["createdAt"]: Date.now() });
      data.data.map((item) => {
        // console.log(item.id);
        // console.log(Number(product.category));
        if (item.id === Number(product.category)) {
          setProduct({ ...product, ["categoryName"]: item.name });
        }
      });
      const tempRequest = api.post("/products", product);
      // console.log(product);
      props.handleClose();
      // props. refreshTry();
    }
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
      if(response.status===200){
        props.handleProductEdit(response.data)
        // console.log("hellooo")
      }
    })()
    props.handleClose();
    props.setActivePage(props.activePage);
    // props.refreshing();
  };
  return (
    <form>
      <Box dir="rtl" sx={{ mt: "2%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
            // overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
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
              name="count"
              type="number"
              onChange={(e) => handleChangeInput(e)}
              sx={{ my: 2 }}
              defaultValue={props.product?.count}
            />
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">دسته بندی</InputLabel>
                <select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="دسته بندی"
                  name="category"
                  required
                  onChange={(e) => handleChangeInput(e)}
                >
                  {data?.data.map((item) => {
                    return <option value={item.id}>{item.name}</option>;
                  })}
                </select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
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
          </Box>
        </Box>
        <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <label>Thumbnail</label>
          <Input
            accept="image/*"
            id="thumbnail"
            name="thumbnail"
            type="file"
            onChange={changeHanlerThumbnail}
          />
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
            <Button variant="contained" component="span">
              Upload
            </Button>
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
              sx={{ width: "50%" }}
            >
              ویرایش
            </Button>
          ) : (
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ width: "50%" }}
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
