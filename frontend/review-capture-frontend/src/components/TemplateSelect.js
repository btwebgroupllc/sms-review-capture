import React, { useState, useEffect, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ResponseValuesContext from "../contexts/ResponseValuesContext";
import ResponseContext from "../contexts/ResponseContext";
const TemplateSelect = ({ templates }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const { text, setText } = useContext(ResponseContext);
  const { responseValues, setResponseValues } = useContext(
    ResponseValuesContext
  );

  useEffect(() => {
    if (!selectedTemplate) return;
    handleSelectTemplate();
  }, [selectedTemplate]);

  const handleSelectTemplate = async () => {
    try {
      setText(selectedTemplate.initial_text);
      setResponseValues((previousValues) => ({
        ...previousValues,
        "response-string-one": selectedTemplate.responseOne.responseString,
        "response-string-two": selectedTemplate.responseTwo.responseString,
        "response-string-three": selectedTemplate.responseThree.responseString,
        "response-one": selectedTemplate.responseOne.responseText,
        "response-two": selectedTemplate.responseTwo.responseText,
        "response-three": selectedTemplate.responseThree.responseText,
      }));
      console.log(responseValues);
    } catch (error) {
      console.log("no current campaigns", error);
    }
  };

  console.log(responseValues);
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <Autocomplete
        id="combo-box-demo"
        options={templates}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        inputValue={templates.templateId}
        onChange={(event, newValue) => {
          setSelectedTemplate(newValue.templateInfo);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select Template" variant="outlined" />
        )}
      />
    </div>
  );
};

export default TemplateSelect;
