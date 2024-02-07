import React, { useState, useEffect } from "react";
import { UseAuth } from "../../service/UseAuth";
import "./home.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../header/Header";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrls, setShortUrls] = useState([]);
  const [editedShortUrl, setEditedShortUrl] = useState("");
  const [editingShortUrl, setEditingShortUrl] = useState(null);
  const { isAuthenticated } = UseAuth();

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  
  const { _id } = useParams();
  const navigate = useNavigate();


/////////////////////////////////-------FETCH URLS---////////////////
  const fetchShortUrls = async () => {
    try {
      const response = await fetch(`http://localhost:8000/getShortURL/${_id}`);
      const data = await response.json();

      if (
        data &&
        Array.isArray(data.shortUrls) &&
        Array.isArray(data.clicks) &&
        data.shortUrls.length === data.clicks.length
      ) {
        const formattedShortUrls = data.shortUrls.map((shortUrl, index) => ({
          shortUrl: shortUrl,
          clicks: data.clicks[index],
          fromDatabase: true,
        }));

        setShortUrls(formattedShortUrls);
      } else {
        console.error("Invalid response data format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const shortenUrl = async () => {
    if (!urlRegex.test(originalUrl)) {
      toast.error("Please enter a valid URL");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl, userId: _id }),
      });
      const data = await response.json();

      if (response.ok) {
        setShortUrls((prevShortUrls) => [
          ...prevShortUrls,
          { shortUrl: data.shortUrl, fromDatabase: false },
        ]);
        setOriginalUrl("");
      } else {
        if (response.status===400) {
          toast.error("Original URL already exists ");
        } else if (response.status===404) {
          toast.error("Short URL already exists");
        } else {
          toast.error("Server error");
        }
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const redirectToOriginalUrl = async (shortUrl) => {
    try {
      const response = await fetch(
        `http://localhost:8000/original/${_id}/${shortUrl}`
      );
      const data = await response.json();
      console.log(data);
      await incrementClicks(shortUrl);
      window.open(data.originalUrl, "_blank");
    } catch (error) {
      console.error(error);
    }
  };
  const incrementClicks = async (shortUrl) => {
    try {
      const response = await fetch(
        `http://localhost:8000/clicks/increment/${shortUrl}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const editUrl = async (shortUrl, newShortUrl) => {
    try {
      if (shortUrl === newShortUrl || newShortUrl.trim() === "") {
        setEditingShortUrl(null);
        return;
      }

      const response = await fetch("http://localhost:8000/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shortUrl, newShortUrl, userId: _id }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setEditingShortUrl(null);
        toast.success('URL updated successfully')
        setShortUrls((prevShortUrls) =>
          prevShortUrls.map((url) =>
            url.shortUrl === shortUrl ? { ...url, shortUrl: newShortUrl } : url
          )
        );
       
      } else {
        console.error("Error updating URL:", data.error);
      }
    } catch (error) {
      console.error("Error updating URL:", error);
    }
  };

  const handleEditClick = (shortUrl) => {
    // Enter editing mode for the specified short URL
    setEditingShortUrl(shortUrl);
  };

  const handleEditInputChange = (event) => {
    
    setEditedShortUrl(event.target.value);
  };

  const handleEditInputKeyPress = (event, shortUrl) => {
    
    if (event.key === "Enter") {
      editUrl(shortUrl, editedShortUrl);
    }
  };

  const deleteUrl = async (shortUrl) => {
    try {
      const response = await fetch(
        `http://localhost:8000/delete/${_id}/${shortUrl}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        
        setShortUrls((prevShortUrls) =>
          prevShortUrls.filter((url) => url.shortUrl !== shortUrl)
        );
        toast.success('URL deleted successfully')
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    } else {
      fetchShortUrls();
    }
  }, [incrementClicks]);

  return (
    <div className="App">
      <Header />
      <h1 style={{ marginTop: "3em" }}>URL Shortener</h1>
      <input
        className="urlInput"
        type="text"
        placeholder="Enter URL to shorten"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button className="shorten" onClick={shortenUrl}>
        Shorten
      </button>

      {shortUrls.map((urlObject, index) => (
        <li className="urlLists" key={index}>
          {editingShortUrl === urlObject.shortUrl ? (
            <>
              <input
                type="text"
                defaultValue={urlObject.shortUrl}
                onChange={handleEditInputChange}
                onKeyPress={(event) =>
                  handleEditInputKeyPress(event, urlObject.shortUrl)
                }
              />
              <button
                onClick={() => editUrl(urlObject.shortUrl, editedShortUrl)}
              >
                <SaveIcon />
              </button>
            </>
          ) : (
            <>
              {urlObject.shortUrl && (
                <Link
                  to={'#'}
                  onClick={() => redirectToOriginalUrl(urlObject.shortUrl)}
                >
                  {urlObject.shortUrl}
                </Link>
              )}
              {urlObject.clicks !== undefined && (
                <span>Clicks: {urlObject.clicks}</span>
              )}
              {urlObject.shortUrl && (
                <>
                  <button onClick={() => handleEditClick(urlObject.shortUrl)}>
                    <ModeEditIcon />
                  </button>
                  <button onClick={() => deleteUrl(urlObject.shortUrl)}>
                    <DeleteIcon />
                  </button>
                </>
              )}
            </>
          )}
        </li>
      ))}
      <ToastContainer/>
    </div>
  );
}

export default Home;
