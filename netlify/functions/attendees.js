const serverless = require("serverless-http");
const express = require("express");
const app = express();

const OAuth = require("oauth-1.0a");
const crypto = require("crypto");
const fetch = require("node-fetch");

// Middleware for JSON body parsing
app.use(express.json());

// API route with query parameters
app.get("/.netlify/functions/attendees", async (req, res) => {
  const { event_id, data_type, search_fld, search_for } = req.query; // Destructure query params

  if (!event_id) {
    return res.status(400).send({ error: "Missing event_id parameter" });
  }

  const oauth = OAuth({
    consumer: {
      key: "igapi", // Your consumer key
      secret: "MeetMax12!", // Your consumer secret
    },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });

  // Construct the URL with dynamic parameters
  let url = `https://www.meetmax.com/sched/service/attendee/list?data_type=${data_type}&event_id=${event_id}`;
  // Add optional parameters if they are present
  if (search_fld) {
    url += `&search_fld=${search_fld}`;
  }
  if (search_for) {
    url += `&search_for=${search_for}`;
  }
  const request_data = {
    url: url,
    method: "GET",
  };

  try {
    console.log("Making request to:", request_data.url);

    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data)),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    let responseData;
    if (data_type === "JSON") {
      responseData = await response.json();
      console.log("JSON data retrieved:", responseData);
    } else if (data_type === "XML") {
      responseData = await response.text(); // Assume XML by default
      console.log("XML data retrieved:", responseData);
    }

    // Send the response back to the client
    res.status(200).send(responseData);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send(JSON.stringify({ error: error.message }));
  }
});

app.get("/.netlify/functions/attendees/add_company", async (req, res) => {
  const {
    event_id,
    first,
    last,
    company,
    attendee_role_id,
    data_type
  } = req.query; // Destructure query params

  if (!event_id) {
    return res.status(400).send({ error: "Missing event_id parameter" });
  }

  const oauth = OAuth({
    consumer: {
      key: "igapi", // Your consumer key
      secret: "MeetMax12!", // Your consumer secret
    },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });

  // Construct the URL with dynamic parameters
  let url = `https://www.meetmax.com/sched/service/attendee/add?event_id=${event_id}&data_type=${data_type}&first=${first}&last=${last}&company=${company}&attendee_role_id=${attendee_role_id}&is_entity="Y"&attendee_type="E"&virtual="Y"`;

  const request_data = {
    url: url,
    method: "GET",
  };

  try {
    console.log("Making request to:", request_data.url);

    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data)),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    let responseData;
    if (data_type === "JSON") {
      responseData = await response.json();
      console.log("JSON data retrieved:", responseData);
    } else if (data_type === "XML") {
      responseData = await response.text(); // Assume XML by default
      console.log("XML data retrieved:", responseData);
    }

    // Send the response back to the client
    res.status(200).send(responseData);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send(JSON.stringify({ error: error.message }));
  }
});

app.get("/.netlify/functions/attendees/add_attendee", async (req, res) => {
  const {
    event_id,
    first,
    last,
    company,
    data_type,
    attendee_role_id,
    username,
    password,
    x_profile_picture,
    x_profile_bio,
    x_bio,
    x_stores,
    x_newstores,
    x_remodel,
    x_init,
    x_products,
    x_productserv,
    x_exusbuis,
    x_logo,
    x_website,
    x_servloc,
    x_producservic,
    x_bestsuit,
    x_sponstopic,
  } = req.query; // Destructure query params

  const oauth = OAuth({
    consumer: {
      key: "igapi", // Your consumer key
      secret: "MeetMax12!", // Your consumer secret
    },
    signature_method: "HMAC-SHA1",
    hash_function(baseString, key) {
      return crypto.createHmac("sha1", key).update(baseString).digest("base64");
    },
  });

  // Construct the URL with dynamic parameters
  let url = `https://www.meetmax.com/sched/service/attendee/add?event_id=${event_id}&first=${first}&last=${last}&company=${company}&attendee_role_id=${attendee_role_id}&data_type=${data_type}`;
  // Add optional parameters if they are present
  if (x_profile_picture) {
    url += `&x_profile_picture=${x_profile_picture}`;
  } else if (x_profile_bio) {
    url += `&x_profile_bio=${x_profile_bio}`;
  } else if (x_bio) {
    url += `&x_bio=${x_bio}`;
  } else if (x_stores) {
    url += `&x_stores=${x_stores}`;
  } else if (x_newstores) {
    url += `&x_newstores=${x_newstores}`;
  } else if (x_remodel) {
    url += `&x_remodel=${x_remodel}`;
  } else if (x_init) {
    url += `&x_init=${x_init}`;
  } else if (x_products) {
    url += `&x_products=${x_products}`;
  } else if (x_productserv) {
    url += `&x_productserv=${x_productserv}`;
  } else if (x_exusbuis) {
    url += `&x_exusbuis=${x_exusbuis}`;
  } else if (x_logo) {
    url += `&x_logo=${x_logo}`;
  } else if (x_website) {
    url += `&x_website=${x_website}`;
  } else if (x_servloc) {
    url += `&x_servloc=${x_servloc}`;
  } else if (x_producservic) {
    url += `&x_producservic=${x_producservic}`;
  } else if (x_bestsuit) {
    url += `&x_bestsuit=${x_bestsuit}`;
  } else if (x_sponstopic) {
    url += `&x_sponstopic=${x_sponstopic}`;
  } else if (username) {
    url += `&username=${username}`;
  } else if (password) {
    url += `&password=${password}`;
  }
  const request_data = {
    url: url,
    method: "GET",
  };

  try {
    console.log("Making request to:", request_data.url);

    const response = await fetch(request_data.url, {
      method: request_data.method,
      headers: {
        ...oauth.toHeader(oauth.authorize(request_data)),
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    let responseData;
    if (data_type === "JSON") {
      responseData = await response.json();
      console.log("JSON data retrieved:", responseData);
    } else if (data_type === "XML") {
      responseData = await response.text(); // Assume XML by default
      console.log("XML data retrieved:", responseData);
    }

    // Send the response back to the client
    res.status(200).send(responseData);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).send(JSON.stringify({ error: error.message }));
  }
});
// Correctly export the handler
module.exports.handler = serverless(app);
