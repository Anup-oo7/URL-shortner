import shortid from 'shortid';
import User from '../model/user.js';

export const shortenUrl = async (req, res) => {
  const { originalUrl, userId } = req.body;

  try {
   
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

   
    const existingUrl = user.urls_details.find(url => url.originalUrl === originalUrl);
    if (existingUrl) {
      return res.status(400).json({ error: 'Original URL already exists in the user\'s URLs' });
    }

    const shortUrl = shortid.generate();
    const newUrl = {
      originalUrl,
      shortUrl,
      clicks: 0
    };

   
    user.urls_details.push(newUrl);
    
    
    await user.save();

    res.json(newUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const getOriginalUrl = async (req, res) => {
  const { _id, shortUrl } = req.params;
 console.log(_id,shortUrl)
  try {
   
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const urlEntry = user.urls_details.find(url => url.shortUrl === shortUrl);

    if (urlEntry) {
      res.json({ originalUrl: urlEntry.originalUrl });
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const getShortUrl = async (req, res) => {
  const { _id } = req.params; 
  
  try {
  
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

  
    const shortUrls = user.urls_details.map(url => url.shortUrl);
    const clicks = user.urls_details.map(url => url.clicks);
   
    res.json({ shortUrls,clicks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const editUrl = async (req, res) => {
  const { userId, shortUrl, newShortUrl } = req.body;

  try {
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const urlEntry = user.urls_details.find(url => url.shortUrl === shortUrl);
    
    if (!urlEntry) {
      return res.status(404).json({ error: 'URL not found' });
    }

   
    urlEntry.shortUrl = newShortUrl;

   
    await user.save();

    res.json({ shortUrl: urlEntry.shortUrl, originalUrl: urlEntry.originalUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


export const deleteUrl = async (req, res) => {
  const { _id, shortUrl } = req.params;
 console.log(_id,shortUrl)
  try {
   
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    
    const filteredUrls = user.urls_details.filter(url => url.shortUrl !== shortUrl);
    if (filteredUrls.length === user.urls_details.length) {
      return res.status(404).json({ error: 'URL not found' });
    }

    
    user.urls_details = filteredUrls;

    
    await user.save();

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



export const incrementClicks = async (req, res) => {
  const { shortUrl } = req.params;
 console.log(shortUrl,'kkkk')
  try {
    
    const user = await User.findOne({ 'urls_details.shortUrl': shortUrl });
    if (!user) {
      return res.status(404).json({ error: 'URL not found' });
    }

    
    const urlEntry = user.urls_details.find(url => url.shortUrl === shortUrl);
    urlEntry.clicks += 1;

    
    await user.save();

    res.json({ message: 'Clicks incremented successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
