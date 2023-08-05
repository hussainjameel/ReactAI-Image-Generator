import { useState } from "react";
import "./App.css";
import { Configuration, OpenAIApi } from "openai";
// import.meta.env.VITE_MY_API_KEY;

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_MY_API_KEY,
});

const openai = new OpenAIApi(Configuration);

function App() {
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  async function fetchData() {
    try {
      setIsLoading(true);
      const response = await openai.createImage(
        {
          prompt: prompt,
          n: 1,
          size: "512x512",
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MY_API_KEY}`,
          },
        }
      );
      setImage(response.data.data[0].url);
      console.log(response.data.data[0].url);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  }

  return (
    <>
      <div className="App">
        <h1 className="heading">React Image Generator</h1>
        <p>
          Welcome to React Image Generator powered by the OpenAI API! With just
          a few keystrokes, you can bring your imagination to life by
          transforming text into captivating images. Whether you're a creative
          writer looking to visualize your stories or an artist seeking
          inspiration, our app is here to turn your words into stunning visuals.
          Simply enter your text in the search bar, click 'Generate', and watch
          as your ideas unfold into vibrant images. Join us on this exciting
          journey of creativity and imagination – where words paint a thousand
          pictures
        </p>
        <div>
          <input
            onChange={(e) => {
              setPrompt(e.target.value);
              console.log("prompt:", e.target.value);
            }}
            placeholder="Enter your prompt"
          />
          <button onClick={fetchData}> Generate</button>
        </div>
        <div className="image-wrapper" style={{ width: 512, height: 512 }}>
          {isLoading ? (
            <>
              <div class="loader">
                <p class="loader-heading">Loading </p>
                <div class="loading">
                  <div class="load"></div>
                  <div class="load"></div>
                  <div class="load"></div>
                  <div class="load"></div>
                </div>
              </div>
            </>
          ) : (
            <img src={image} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
