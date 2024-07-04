/**
 * This class is used to make API calls to the backend server.
 */
class Api {
    private static readonly BASE_URL = "http://localhost:8080/";

    /**
     * This method is used to make a GET request to the server.
     * @param endpoint
     */
    static async get(endpoint: string) {
        const response = await fetch(this.BASE_URL + endpoint);
        return response.json();
    }

    /**
     * This method is used to make a POST request to the server.
     * @param endpoint
     * @param body
     */
    static async post(endpoint: string, body: object | null) {
        const response = await fetch(this.BASE_URL + endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    /**
     * This method is used to make a PUT request to the server.
     * @param endpoint
     * @param id
     * @param body
     */
    static async put(endpoint: string, id: number, body: object | null) {
        const response = await fetch(`${this.BASE_URL}${endpoint}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    /**
     * This method is used to make a PATCH request to the server.
     * @param endpoint
     * @param id
     * @param body
     */
    static async patch(endpoint: string, id: number, body: object | null) {
        const response = await fetch(`${this.BASE_URL}${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    /**
     * This method is used to make a DELETE request to the server.
     * @param endpoint
     * @param id
     */
    static async delete(endpoint: string, id: number) {
        const response = await fetch(`${this.BASE_URL}${endpoint}/${id}`, {
            method: "DELETE"
        });
        return response.json();
    }
}

export default Api;