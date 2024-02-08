import React from "react";
import { useState } from "react";

const CopyClipboard = () => {
  const [checkedCheckboxes1, setCheckedCheckboxes1] = useState([]);
  const [checkedCheckboxes2, setCheckedCheckboxes2] = useState([]);
  const [checkedCheckboxes3, setCheckedCheckboxes3] = useState([]);
  const [checkedCheckboxes4, setCheckedCheckboxes4] = useState([]);
  const [checkedCheckboxes5, setCheckedCheckboxes5] = useState([]);
  const [checkedCheckboxes6, setCheckedCheckboxes6] = useState([]);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleCheckboxChange = (sourceIndex, checkboxIndex) => {
    // Use the correct state variable based on the source index
    switch (sourceIndex) {
      case 1:
        setCheckedCheckboxes1((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 2:
        setCheckedCheckboxes2((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 3:
        setCheckedCheckboxes3((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;
      case 4:
        setCheckedCheckboxes4((prevCheckboxes) => {
          const updatedCheckboxes = [...prevCheckboxes];
          updatedCheckboxes[checkboxIndex] = !updatedCheckboxes[checkboxIndex];
          return updatedCheckboxes;
        });
        break;

      default:
        break;
    }
  };

  const extractText = (element) => {
    if (typeof element === "string") {
      return element.trim();
    } else if (Array.isArray(element)) {
      return element.map(extractText).join(" ");
    } else if (element.props && element.props.children) {
      return extractText(element.props.children);
    } else {
      return "";
    }
  };
  const handleDownloadTextFile = () => {
    const selectedParagraphs = [source1, source2, source3, source4].map(
      (source, index) =>
        source
          .filter((_, checkboxIndex) => {
            switch (index) {
              case 0:
                return checkedCheckboxes1[checkboxIndex];
              case 1:
                return checkedCheckboxes2[checkboxIndex];
              case 2:
                return checkedCheckboxes3[checkboxIndex];
              case 3:
                return checkedCheckboxes4[checkboxIndex];

              default:
                return false;
            }
          })
          .map((paragraph, index) => {
            // Process each paragraph as needed
            return typeof paragraph === "string"
              ? paragraph.trim()
              : extractText(paragraph).trim();
          })
    );

    const blob = new Blob([selectedParagraphs.flat().join("\n")], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "selected_content.txt";
    link.click();

    // Reset selected checkboxes
    setCheckedCheckboxes1(Array(checkedCheckboxes1.length).fill(false));
    setCheckedCheckboxes2(Array(checkedCheckboxes2.length).fill(false));
    setCheckedCheckboxes3(Array(checkedCheckboxes3.length).fill(false));
    setCheckedCheckboxes4(Array(checkedCheckboxes4.length).fill(false));

    // Reset additional sources if needed
  };

  return (
    <div>
      {" "}
      {source1 && source2 && source3 && source4 && (
        <div className="btn-copy">
          <button
            type="button"
            className="btn btn-lg"
            onClick={handleDownloadTextFile}
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
};

export default CopyClipboard;
