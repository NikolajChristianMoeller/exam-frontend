export default class Api {
    private static readonly BASE_URL = 'http://localhost:8080/';

    static async get(endpoint: string) {
        const response = await fetch(this.BASE_URL + endpoint);
        return response.json();
    }

    static async post(endpoint: string, body: object | null) {
        const response = await fetch(this.BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    static async put(endpoint: string, id: number, body: object | null) {
        const response = await fetch(`${this.BASE_URL}${endpoint} /${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    static async patch(endpoint: string, id: number, body: object | null) {
        const response = await fetch(`${this.BASE_URL}${endpoint}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return response.json();
    }

    static async delete(endpoint: string, id: number) {
        const response = await fetch(`${this.BASE_URL}${endpoint}/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }
}