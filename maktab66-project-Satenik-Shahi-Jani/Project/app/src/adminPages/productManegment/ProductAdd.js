import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { TextField, Box } from "@mui/material";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ModalPage from "../../components/ModalPage";

export function ProductAdd(props) {
  //   CKEditor.editorConfig = function( config )
  // {
  // config.resize_enabled = false;
  // config.height = 700;
  // config.width = 700;
  // };, Button, Container
  // ClassicEditor.create(...)
  // .then(editor => {
  //     editor.editing.view.change( writer => {
  //         writer.setStyle('min-height', '300px', editor.editing.view.document.getRoot());
  //     } );
  // window.editor = editor;
  // );

  return (
    <Box dir="rtl" sx={{ mt: "2%" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignContent: "center",
          width: "100%",
        }}
      >
        <TextField
          required
          sx={{ width: "48%", my: 2 }}
          id="outlined-required"
          label="Required"
          defaultValue={props.product?.name}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          sx={{ width: "48%", my: 2 }}
          defaultValue={props.product?.price}
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          sx={{ width: "48%", my: 2 }}
          defaultValue={props.product?.count}
        />
      </Box>
      <Box sx={{ width: "%100", display: "flex", justifyContent: "center" }}>
        <CKEditor
          style={{ width: "100%" }}
          editor={ClassicEditor}
          data={props.product?.description}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
        />
      </Box>
    </Box>
  );
}
export default ModalPage(ProductAdd);
