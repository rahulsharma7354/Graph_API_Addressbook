export class ApiProvider {

    static token: string = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlZmZVdtX3lvNDhHbFNGWHUtdW9OYzZMaks3dVNpOGM4TUUxMjU4aGZaV3MiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8wNmRlODdkMC0xYmU1LTQ3NmEtODRiNS0yNDRlNDBjZWQ4MmYvIiwiaWF0IjoxNjcxNzEwMTQzLCJuYmYiOjE2NzE3MTAxNDMsImV4cCI6MTY3MTcxNDA0MywiYWlvIjoiRTJaZ1lOaTcvc21OY3JZSmhuOHFyZSt3dEU3ZkFBQT0iLCJhcHBfZGlzcGxheW5hbWUiOiJBZGRyZXNzQm9vayIsImFwcGlkIjoiOTY3ZWQ4ODctNjA2NS00ZThkLTg0YWMtODRhMDIzZGZmNmI0IiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMDZkZTg3ZDAtMWJlNS00NzZhLTg0YjUtMjQ0ZTQwY2VkODJmLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiNjYxNWRlNjctY2NjNS00Y2JiLWFlOWMtNzZlNDk1MzNkYTViIiwicmgiOiIwLkFWa0EwSWZlQnVVYmFrZUV0U1JPUU03WUx3TUFBQUFBQUFBQXdBQUFBQUFBQUFDZEFBQS4iLCJyb2xlcyI6WyJVc2VyLlJlYWRCYXNpYy5BbGwiLCJVc2VyLlJlYWRXcml0ZS5BbGwiLCJVc2VyLlJlYWQuQWxsIl0sInN1YiI6IjY2MTVkZTY3LWNjYzUtNGNiYi1hZTljLTc2ZTQ5NTMzZGE1YiIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6IjA2ZGU4N2QwLTFiZTUtNDc2YS04NGI1LTI0NGU0MGNlZDgyZiIsInV0aSI6IlNPLWxfM1hXLWtPSVNUTFUwektvQVEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjA5OTdhMWQwLTBkMWQtNGFjYi1iNDA4LWQ1Y2E3MzEyMWU5MCJdLCJ4bXNfdGNkdCI6MTY2NTcwNDU0M30.PSBqXkG2CUjQ3M490lR4WUQOcLCNF_NzFu0eIdP_7CFTOpPy7-FIzzAGokW0gSXjPgWMamc2CN3N8sbdED2NzG4NWRgdfwjkTExOjNdXhKKI9GVS3opbYK_XTu74r_z0pcUBDJfxYT_wvB_RWrR8zy3NXfduMVpftjNlYNVu_aVkAlvsG267Np1EVf1ZGZqM3MILzyrCZqcLZkWT1eMUY_rj7QavbnKm9QzV1fuDivJEVQIqx2NXnD68Syz0yCewPxOEJXA3vNV0JlkptgYuVeJQF6kswPL0AbBF6-NnUZEXYQhhIZ8cYMKYT0UDYjna7ytuvDH2yyEw1457JlH-ew";
    
    static createContact(contact: Contact, update: Function): void {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "accountEnabled": true,
            "city": "Seattle",
            "country": "United States",
            "department": "Sales & Marketing",
            "displayName": contact.name,
            "givenName": contact.name,
            "jobTitle": "Marketing Director",
            "mailNickname": "MelissaD",
            "passwordPolicies": "DisablePasswordExpiration",
            "passwordProfile": {
                "password": "a91a8105-f2a9-867b-96eb-259b08b274fc",
                "forceChangePasswordNextSignIn": false
            },
            "officeLocation": "131/1105",
            "postalCode": "98052",
            "preferredLanguage": "en-US",
            "state": "WA",
            "streetAddress": "9256 Towne Center Dr., Suite 400",
            "surname": "Darrow",
            "mobilePhone": contact.mobile,
            "usageLocation": "US",
            "userPrincipalName": `${contact.name}@qvzz.onmicrosoft.com`
        });

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://graph.microsoft.com/v1.0/users", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                update();
            })
            .catch(error => console.log('error', error));
    }

    static async getAllContacts() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        return new Promise<any>((resolve: (data: any) => void, reject: (error: any) => void): void => {
            fetch("https://graph.microsoft.com/v1.0/users", requestOptions).then((response) => {
                return response.json().then((res) => {
                    if (!response.ok) {
                        reject({
                            status: response.status ? response.status.toString() : "",
                            message: (res.error.message && res.error.message.value) || 'Request Failed'
                        });
                    }
                    else {
                        console.log(res);
                        resolve(res);
                    }
                })
            })
                .catch(error => console.log('error', error));
        });
    }

    static deleteContact(key: string, update: Function) {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);

        var requestOptions: RequestInit = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`https://graph.microsoft.com/v1.0/users/{${key}}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                update();
            })
            .catch(error => console.log('error', error));
    }

    static updateContact(contact: Contact, update: Function): void {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "displayName": contact.name
        });

        var requestOptions: RequestInit = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://graph.microsoft.com/v1.0/users/{${contact.key}}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                update();
            })
            .catch(error => console.log('error', error));
    }
}

export interface Contact {
    key: string,
    name: string,
    email: string,
    mobile: string,
    landline: string,
    website: string,
    address: string
}