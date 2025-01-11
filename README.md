
# ChatBot with Microservice and Tensor Visualization

This repository contains a **ChatBot** system integrated with a backend microservice for searching similar documents, along with graphical visualization of tensor-based data. The microservice receives messages from various sources, standardizes the main information, and performs similarity comparisons to return results. The frontend provides an interface for interacting with the search and visualizing charts generated from the data.

## Features

- **Document Search by Similarity**: Submit a query to return similar documents based on a feature vector.
- **Tensor Data Visualization**: Graphs generated from vector data showing positions and values in the tensor.
- **WhatsApp Integration**: Through **Zapster**, the service can receive WhatsApp messages and process them.

## Project Structure

The project consists of two main components:

### Backend (Microservice)
- **RESTful API** to receive and process document search requests.
- **Data Processing**: Receives vector data, calculates similarity, and returns the most relevant documents.
- **Tensor Visualization**: Processes the vector data and displays it graphically.

### Frontend
- **Search Form**: Allows users to submit a query and obtain similar documents.
- **Tensor Graph**: Displays graphs generated from the data returned by the search.
- **Results Display**: Shows the found documents with their respective similarity scores.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - Data Manipulation with **Tensors**
  
- **Frontend**:
  - HTML, CSS, JavaScript
  - **Chart.js** for graphical tensor visualization
  - **Fetch API** for communication with the backend

## Installation

### Backend

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/repository-name.git
   cd repository-name
   ```

2. Install the backend dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm start
   ```

The backend will be available at `http://localhost:3000/api`.

### Frontend

1. For the frontend, simply open the `index.html` file directly in a browser or serve the files via a local server. The frontend will communicate with the backend via the RESTful API.

2. If necessary, adjust the API base URL in the frontend (`API_BASE_URL` variable in the code).

## Usage

1. **Document Query**: The user can submit a query through the search form in the frontend.
2. **Graph Visualization**: After the search, the results will be displayed along with a similarity graph based on the vector data.

## Example Vectors

Vectors are a set of numerical values representing document features. A valid vector may look like this:

```json
[73053, 84053, 67513, 11, 297, 4433, 40492, 822, 665, 97843]
```

These vectors can be processed by the backend to calculate similarity between documents.

## Example API Response

The API response for a document search may have the following format:

```json
{
  "documents": [
    {
      "content": "Text of the found document",
      "similarity": 0.85,
      "metadata_url": "http://example.com/document",
      "vector": [73053, 84053, 67513, 11, 297, ...]
    }
  ]
}
```

## Contribution

Contributions are welcome! If you have suggestions or improvements for the project, feel free to open an **issue** or **pull request**.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
