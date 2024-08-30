function navigate(page) {

    const content = document.getElementById('content');

   

    switch (page) {

        case 'homepage':

            content.innerHTML = '<h2>Homepage</h2><p>Welcome to 24/7 Meds Dashboard!</p>';

            break;

        case 'suppliers':

            content.innerHTML = '<h2>Suppliers</h2><p>List of suppliers</p>';

            break;

        case 'inventory':

            content.innerHTML = '<h2>Inventory</h2><p>Manage your inventory here</p>';

            break;

        case 'reports':

            content.innerHTML = '<h2>Reports</h2><p>View various reports.</p>';

            break;

        case 'login':

            content.innerHTML = `

                <h2>Login</h2>

                <form>

                    <div class="form-group">

                        <label for="username">Username:</label>

                        <input type="text" class="form-control" id="username" placeholder="Enter username">

                    </div>

                    <div class="form-group">

                        <label for="password">Password:</label>

                        <input type="password" class="form-control" id="password" placeholder="Enter password">

                    </div>

                    <button type="submit" class="btn btn-success">Login</button>

                </form>

            `;

            break;

        case 'signup':

            content.innerHTML = '<h2>Signup</h2><p>Create a new account.</p>';

            break;

        default:

            content.innerHTML = '<h2>404 Not Found</h2><p>Page not found.</p>';

            break;

    }

}