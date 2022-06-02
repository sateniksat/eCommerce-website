import * as React from "react";

export default function BasicEditingGrid() {
  return <></>;
}

// import { DataGrid } from "@mui/x-data-grid";
// const columns = [
//   {
//     field: "name",
//     headerName: "نام کالا",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "price",
//     headerName: " قیمت",
//     width: 150,
//     editable: true,
//   },
//   {
//     field: "count",
//     headerName: "موجودی",
//     type: "number",
//     width: 110,
//     editable: true,
//   },
// ];

// {
//   field: "fullName",
//   headerName: "Full name",
//   description: "This column has a value getter and is not sortable.",
//   sortable: false,
//   width: 160,
//   valueGetter: (params) =>
//     `${params.row.firstName || ""} ${params.row.lastName || ""}`,
// },

// const [data, setdata] = useState([]);

// useEffect(() => {
//   (async () => {
//     try {
//       const response = await api.get("/products").then((res) => res.data);
//       setdata(response);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   })();
// }, []);\\
// const [pageSize, setPageSize] = useState(10);
// const [newData, setNewData] = useState([]);
// const { data, loading, error } = useFetch(`/products`);
// const row = data?.data.map((item) => {
//   return {
//     name: item?.name,
//     price: item?.price,
//     count: item?.count,
//     id: item?.id,
//   };
// });
// const handleCommit=(params,event)=>{
//   event.stopPropagation()
//   console.log(params)
// const array=data.data.map(item=>{
//   if(item.id===e.id){
//     return{...item,[e.field]:e.value}
//   }else{
//     return{...item}
//   }
// })
// setNewData(array);
// console.log(newData)
// }

{
  /* <Box dir="rtl" sx={{ height: "90vh", width: "100%" }}>
        <DataGrid
          rows={row}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20]}
          // onCellFocusOut={handleCommit}
          onCellEditStop={handleCommit}
        />
      </Box> */
}
