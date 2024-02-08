import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import sendBtn from "../assets/send.svg";
import Tab from "../components/Tab";
import beans from "../assets/Beans-logos_black.png";
import CopyClipboard from "./CopyClipboard";

const Textgenerate = () => {
  const [taskSelected, setTaskSelected] = useState("");
  const [genreSelected, setGenreSelected] = useState("");
  const [writingStyleSelected, setWritingStyleSelected] = useState("");
  const [natureSelected, setNatureSelected] = useState("");
  const [editorialSelected, setEditorialSelected] = useState("");
  const [toneselected, setToneSelected] = useState("");
  const [characterLimitSelected, setCharacterLimitSelected] = useState("");
  const [inputText, setInputText] = useState("");
  const [prompt, setPrompt] = useState("");
  const [source1, setSource1] = useState("");
  const [source2, setSource2] = useState("");
  const [source3, setSource3] = useState("");
  const [source4, setSource4] = useState("");
  const [source5, setSource5] = useState(null);
  const [source6, setSource6] = useState(null);
  const [source7, setSource7] = useState(null);
  const [inputAutoText, setInputAutoText] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [claudLoading, setClaudLoading] = useState(false);
  const [palmLoading, setPalmLoading] = useState(false);
  const [gptLoading, setGptLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [autoLoading, setAutoLoading] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState("claud");

  const handleSelectChange = (option, setterFunction) => {
    setterFunction(option);
  };

  const taskOptions = [
    { value: "Journo Assist", label: "Journo Assist" },
    { value: "Generate", label: "Generate" },
    { value: "Profanity Check", label: "Profanity Check" },
    { value: "Jargon and Obscure Word", label: "Jargon and Obscure Word" },
    { value: "Buzzwords and Clichés", label: "Buzzwords and Clichés" },
    { value: "Proof Read", label: "Proof Read" },
    {
      value: "Reset the length of content",
      label: "Reset the length of content",
    },
  ];
  const genreOptions = [
    { value: "", label: "Genres" }, // Note: You might want to consider an empty value for the default option
    { value: "Current Events", label: "Current Events" },
    { value: "Policy and Governance", label: "Policy and Governance" },
    { value: "Technology", label: "Technology" },
    { value: "Health and Wellness", label: "Health and Wellness" },
    { value: "Education", label: "Education" },
    { value: "Environment", label: "Environment" },
    { value: "Culture and Arts", label: "Culture and Arts" },
    { value: "Social Issues", label: "Social Issues" },
    { value: "Sports", label: "Sports" },
  ];
  const natureOptions = [
    { value: "Political", label: "Political" },
    { value: "Investigative", label: "Investigative" },
    { value: "Reporting in-depth", label: "Reporting in-depth" },
    { value: "Timeline", label: "Timeline" },
    { value: "Gossip", label: "Gossip" },
    { value: "Humorous", label: "Humorous" },
    { value: "Blog / Essay", label: "Blog / Essay" },
    { value: "Personality / Profile", label: "Personality / Profile" },
    { value: "Advice", label: "Advice" },
    { value: "Editorial", label: "Editorial" },
    {
      value: "Critical/Judgemental/Analysis",
      label: "Critical/Judgemental/Analysis",
    },
    { value: "Review - Book or Movie", label: "Review - Book or Movie" },
    { value: "Food Columns", label: "Food Columns" },
    {
      value: "View / Counter-View (Point)",
      label: "View / Counter-View (Point)",
    },
    {
      value: "Explanation or recommendation",
      label: "Explanation or recommendation",
    },
    { value: "Quotation and facts", label: "Quotation and facts" },
    { value: "Opening Remark/thesis", label: "Opening Remark/thesis" },
    { value: "Objective explanation", label: "Objective explanation" },
    {
      value: "Analogies/history/examples",
      label: "Analogies/history/examples",
    },
    { value: "Set up example", label: "Set up example" },
  ];
  const editorialOptions = [
    { value: "", label: "Editorial Will" }, // Consider an empty value for the default option
    { value: "Explain or Interpret", label: "Explain or Interpret" },
    {
      value: "Critical Analysis or review",
      label: "Critical Analysis or review",
    },
    { value: "Persuade or reform", label: "Persuade or reform" },
    { value: "Recommend", label: "Recommend" },
    { value: "Opinion", label: "Opinion" },
    { value: "Elaborate", label: "Elaborate" },
    {
      value: "Infer or deduce or conclude",
      label: "Infer or deduce or conclude",
    },
    { value: "List", label: "List" },
    { value: "Narrow down focus", label: "Narrow down focus" },
    { value: "Outline", label: "Outline" },
    { value: "Predict", label: "Predict" },
    { value: "Produce", label: "Produce" },
    { value: "Propose", label: "Propose" },
    { value: "Rephrase", label: "Rephrase" },
    { value: "Reword", label: "Reword" },
    { value: "Sum up", label: "Sum up" },
    { value: "Summarise", label: "Summarise" },
    { value: "Suggest", label: "Suggest" },
    { value: "Translate", label: "Translate" },
    { value: "Argue", label: "Argue" },
    { value: "Combine", label: "Combine" },
    { value: "Compare", label: "Compare" },
    { value: "Differentiate", label: "Differentiate" },
    { value: "Discuss", label: "Discuss" },
  ];
  const writingStyleOptions = [
    { value: "", label: "Preferred Writing Style" }, // Consider an empty value for the default option
    { value: "Narrative", label: "Narrative" },
    { value: "Descriptive", label: "Descriptive" },
    { value: "Expository", label: "Expository" },
    { value: "Persuasive", label: "Persuasive" },
    { value: "Creative", label: "Creative" },
    { value: "Objective", label: "Objective" },
    { value: "Subjective", label: "Subjective" },
    { value: "Review", label: "Review" },
    { value: "Poetic", label: "Poetic" },
    { value: "Technical", label: "Technical" },
  ];
  const toneOptions = [
    { value: "", label: "Tone of the Article" }, // Consider an empty value for the default option
    { value: "Positive", label: "Positive" },
    { value: "Negative", label: "Negative" },
    { value: "Neutral", label: "Neutral" },
  ];
  const characterLimitOptions = [
    { value: "", label: "Character limit" }, // Consider an empty value for the default option
    { value: "300", label: "300" },
    { value: "300-500", label: "300-500" },
    { value: "None", label: "None" },
  ];

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /*ALL FETCH FUNCTIONS */
  ///////////////////////////////////

  /*-----------OPENAI FETCH FUNCTION--------------------- */

  const handleGenerateText = async () => {
    try {
      setGptLoading(true);
      // Construct the prompt based on selected options
      const prompt = ` consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
      if (
        characterLimitSelected === "300" ||
        characterLimitSelected === "300-500"
      ) {
        // Add the additional line if the character limit is 300 or 300-500
        setPrompt(
          `${prompt} The word count of the output should not be greater than ${characterLimitSelected}.`
        );
      } else {
        setPrompt(prompt);
      }
      // Make the API call to generate text
      const response = await fetch("http://localhost:3001/generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate text");
      }
      setGptLoading(false);
      // Handle the generated text result as needed...
      const data = await response.json();
      console.log(data.textGeneration);
      setSource3(data.textGeneration);

      return data.textGeneration;
      // Update the state or perform other actions based on the generated text
    } catch (error) {
      console.error("Error during text generation:", error);
      // Handle the error...
    }
  };

  // ///////////////////////////////////////////////////////////////////////////////////////////////

  const handleImage = async () => {
    const prompt = `Generate the image according to the given input: ${inputText}`;
    const requestData = { prompt };

    try {
      const response = await fetch("http://localhost:3001/image-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.image_url);
        setImageURL(data.image_url); // Assuming the API response has an "image_url" property
      } else {
        console.error("Error generating image");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const handleAutoCompletion = async () => {
    const prompt = ` Autocomplete the given text and ensure that the completed response is grammatically correct . Expand upon the provided input to create a coherent and well-formed passage. Input Text:${inputAutoText}`;

    const requestData = { prompt: prompt };
    try {
      const response = await fetch("http://localhost:3001/autogenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setSource5(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTitleGeneration = async () => {
    const prompt = `  provide multiple title options for following input as well . Input Text:${inputAutoText}`;

    const requestData = { prompt: prompt };
    try {
      const response = await fetch("http://localhost:3001/titlegenerate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setSource6(data.summary);
        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////
  const handleTextAutoCompletion = async () => {
    setSource5(null);
    setSource6(null);
    setSource7(null);

    await Promise.all([handleAutoCompletion(), handleTitleGeneration()])
      .then(() => {
        console.log("Sucessfully fetched response");
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error:", error);
      })
      .finally(() => {});
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleTextRephrase = async () => {
    const prompt = `Please rephrase following text : ${inputAutoText}`;

    const requestData = { prompt: prompt };
    try {
      setAutoLoading(true);
      const response = await fetch("http://localhost:3001/rephrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setAutoLoading(false);
        const data = await response.json();

        setSource7(data.summary);
        setSource5(null);
        setSource6(null);

        return data.summary;
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  // /////////////////////////////////////////////////////////////////////////
  const handlePalmGenerateContent = async () => {
    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    if (
      characterLimitSelected === "300" ||
      characterLimitSelected === "300-500"
    ) {
      // Add the additional line if the character limit is 300 or 300-500
      setPrompt(
        `${prompt} The word count of the output should not be greater than ${characterLimitSelected}.`
      );
    } else {
      setPrompt(prompt);
    }
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setPalmLoading(true);
      const response = await fetch("http://localhost:3001/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setPalmLoading(false);
        const data = await response.json();

        setSource2(data.summary);
        return data.summary;

        // setOutput(data.summary);

        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  /////////////////////////////////////////////////////////////////////////////////////////

  const handleClaudeGenerateContent = async () => {
    const prompt = `consider yourself as subject expert of ${genreSelected} and ${editorialSelected} ${natureSelected} aspects of ${inputText} in style of ${writingStyleSelected} in ${toneselected} tone.`;
    if (
      characterLimitSelected === "300" ||
      characterLimitSelected === "300-500"
    ) {
      // Add the additional line if the character limit is 300 or 300-500
      setPrompt(
        `${prompt} The word count of the output should not be greater than ${characterLimitSelected}.`
      );
    } else {
      setPrompt(prompt);
    }
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setClaudLoading(true);
      const response = await fetch("http://localhost:3001/invoke-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setClaudLoading(false);
        const data = await response.json();

        setSource1(data.summary);
        return data.summary;

        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };
  ///////////////////////////////////////////////////////////////////////////////////////////////
  const handleContent = async () => {
    try {
      setLoading(true);
      handleClaudeGenerateContent();
      handlePalmGenerateContent();
      handleGenerateText();
      await handleImage();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("asd", source1, source2, source3);

    if ("" !== source1 && "" !== source2 && "" !== source3)
      handleSummary(
        `${JSON.stringify(source1)}${JSON.stringify(source2)}${JSON.stringify(
          source3
        )}`
      );
  }, [source1, source2, source3]);

  const handleSummary = async (allResponse) => {
    if (!allResponse) {
      console.log(allResponse);
      return "Please select the repsonse";
    }
    const prompt = `Article: ${allResponse}

    You will generate increasingly concise entity-dense summaries of the above article. Repeat the following 5 times.Don't use the word summary in response.
    Guidelines:
    The first summary should be long (4-5 sentences, ~80 words), yet highly non-specific, containing little information beyond the entities marked as missing. Use overly verbose language and fillers (e.g., “this article discusses”) to reach ~80 words.
    Make every word count. Rewrite the previous summary to improve flow and make space for additional entities.
    Make space with fusion, compression, and removal of uninformative phrases like “the article discusses”.
    The summaries should become highly dense and concise, yet self-contained, e.g., easily understood without the article.
    Missing entities can appear anywhere in the new summary.
    Never drop entities from the previous summary. If space cannot be made, add fewer new entities.
    Remember: Use the exact same number of words for each summary.`;

    // setPrompt(prompt);

    // setPrompt(prompt);
    const requestData = { prompt: prompt };

    console.log(JSON.stringify(requestData));
    try {
      setSummaryLoading(true);
      const response = await fetch("http://localhost:3001/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        setSummaryLoading(false);
        const data = await response.json();

        setSource4(data.summary);
        console.log(data.summary);
      } else {
        console.error("Error generating content");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
    }
  };

  const handleLinkClick = (engine) => {
    setSelectedEngine(engine);
  };

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="container-fluid">
      <div className="row vh-100">
        <div className="col-md-4 border-end border-dark left-side">
          <div className="">
            <div className=" d-flex">
              <img
                src={beans}
                alt=""
                className="logo img-fluid"
                // style={{ maxWidth: "30%", maxHeight: "30%" }}
              ></img>
              <h1 className="heading-ai">.toi.ai</h1>
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={taskOptions}
                onSelect={(value) => handleSelectChange(value, setTaskSelected)}
              />
            </div>
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={genreOptions}
                onSelect={(value) =>
                  handleSelectChange(value, setGenreSelected)
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={natureOptions}
                onSelect={(value) =>
                  handleSelectChange(value, setNatureSelected)
                }
              />
            </div>
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={editorialOptions}
                onSelect={(value) =>
                  handleSelectChange(value, setEditorialSelected)
                }
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={writingStyleOptions}
                onSelect={(value) =>
                  handleSelectChange(value, setWritingStyleSelected)
                }
              />
            </div>
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={toneOptions}
                onSelect={(value) => handleSelectChange(value, setToneSelected)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              {" "}
              <SelectBox
                options={characterLimitOptions}
                onSelect={(value) =>
                  handleSelectChange(value, setCharacterLimitSelected)
                }
              />
            </div>
          </div>
          <div className="input-group mb-3  p-1">
            <input
              className="form-control me-2 p-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              onClick={handleContent}
            >
              <img src={sendBtn} alt="Send"></img>
            </button>
          </div>

          <div className="reset mb-5 d-flex justify-content-center">
            <button
              type="button"
              className="btn-default btn-sm reset-btn"
              onClick={() => {
                window.location.reload();
              }}
            >
              R E S E T
            </button>
          </div>
          <div className=" text-end ">
            <p className="text-muted small opacity-0 ">
              *Powered by Claud(AWS).Vertex(Google).OpenAI(Microsoft)
            </p>
          </div>
        </div>

        <div className="col-md-8">
          <div className="container mt-2 border p-2 tab d-flex flex-column">
            <div className="btn-group d-flex flex-wrap" role="group">
              <button
                type="button"
                className={`btn me-2 tab-btn fw-bold  ${
                  selectedEngine === "claud" && source1 ? "active" : ""
                }`}
                onClick={() => handleLinkClick("claud")}
              >
                Suggestion 1
              </button>
              <button
                type="button"
                className={`btn btn-outline- me-2 tab-btn fw-bold ${
                  selectedEngine === "palm" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("palm")}
              >
                Suggestion 2
              </button>
              <button
                type="button"
                className={`btn   me-2 tab-btn fw-bold ${
                  selectedEngine === "generate" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("generate")}
              >
                Suggestion 3
              </button>
              <button
                type="button"
                className={`btn  tab-btn fw-bold  ${
                  selectedEngine === "summary" ? "active" : ""
                }`}
                onClick={() => handleLinkClick("summary")}
              >
                Suggestion 4
              </button>
            </div>
          </div>
          {/* <div className="mt-5 d-flex justify-content-center h-75">
            <textarea className="form-control w-75 textarea" readOnly />
          </div> */}

          {!claudLoading && selectedEngine === "claud" && !source1 && (
            <div className="banner">
              <h3>Hello editor! Welcome to BCCL AI console.</h3>
              <h3>Over to You...</h3>
            </div>
          )}

          <div className="d-flex justify-content-center  ">
            <div>
              {claudLoading && selectedEngine === "claud" && (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!claudLoading && selectedEngine === "claud" && source1 && (
              <div
                className="custom-textarea mt-5 w-75 overflow-auto h-75"
                contentEditable={false} // Set to true if you want to allow editing
                suppressContentEditableWarning={true}
              >
                <p>
                  {" "}
                  {source1 && (
                    <>
                      {source1.split("\n").map((paragraph, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          {paragraph.trim() && (
                            <>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox${index}`}
                                // checked={checkedCheckboxes1[index]}
                                // onChange={() => handleCheckboxChange(1, index)}
                                value=""
                                aria-label="..."
                              />
                              <span style={{ marginLeft: "5px" }}>
                                {paragraph}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </p>
              </div>
            )}

            <div>
              {palmLoading && selectedEngine === "palm" && (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!palmLoading && selectedEngine === "palm" && source2 && (
              <div
                className="custom-textarea mt-5 w-75 overflow-auto h-75"
                contentEditable={false} // Set to true if you want to allow editing
                suppressContentEditableWarning={true}
              >
                <p>
                  {" "}
                  {source2 && (
                    <>
                      {source2.split("\n").map((paragraph, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          {paragraph.trim() && (
                            <>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox${index}`}
                                // checked={checkedCheckboxes1[index]}
                                // onChange={() => handleCheckboxChange(1, index)}
                                value=""
                                aria-label="..."
                              />
                              <span style={{ marginLeft: "5px" }}>
                                {paragraph}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </p>
              </div>
            )}

            <div>
              {gptLoading && selectedEngine === "generate" && (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!gptLoading && selectedEngine === "generate" && source3 && (
              <div
                className="custom-textarea mt-5 w-75 overflow-auto h-75"
                contentEditable={false} // Set to true if you want to allow editing
                suppressContentEditableWarning={true}
              >
                <p>
                  {" "}
                  {source3 && (
                    <>
                      {source3.split("\n").map((paragraph, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          {paragraph.trim() && (
                            <>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox${index}`}
                                // checked={checkedCheckboxes1[index]}
                                // onChange={() => handleCheckboxChange(1, index)}
                                value=""
                                aria-label="..."
                              />
                              <span style={{ marginLeft: "5px" }}>
                                {paragraph}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </p>
              </div>
            )}

            <div>
              {summaryLoading && selectedEngine === "summary" && (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="spinner-border text-dark" role="status">
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!summaryLoading && selectedEngine === "summary" && source4 && (
              <div
                className="custom-textarea mt-5 w-75 overflow-auto h-75"
                contentEditable={false} // Set to true if you want to allow editing
                suppressContentEditableWarning={true}
              >
                <p>
                  {" "}
                  {source4 && (
                    <>
                      {source4.split("\n").map((paragraph, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                          {paragraph.trim() && (
                            <>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox${index}`}
                                // checked={checkedCheckboxes1[index]}
                                // onChange={() => handleCheckboxChange(1, index)}
                                value=""
                                aria-label="..."
                              />
                              <span style={{ marginLeft: "5px" }}>
                                {paragraph}
                              </span>
                            </>
                          )}
                        </div>
                      ))}
                      <div className="ai-img">
                        <p>
                          --------------------------------------------------------------------------
                        </p>
                        <h3>AI-IMAGE</h3>
                        <img
                          src={imageURL}
                          alt="Generated "
                          className="ai-image"
                        />{" "}
                      </div>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
          <CopyClipboard />
        </div>
      </div>
    </div>
  );
};

export default Textgenerate;
