describe("testing API products and response statuses", () => {
  it("should test to get the id of the product", () => {
    cy.apiRequest(
      "GET",
      "https://automationexercise.com/api/productsList"
    ).then(({ status, parseBody }) => {
      expect(status).to.be.eq(200);
      expect(parseBody).to.have.property("products");
      expect(parseBody.products[0]).to.have.property("id");
    });
  });

  it("should GET the content of the body", () => {
    cy.apiRequest(
      "GET",
      "https://automationexercise.com/api/productsList"
    ).then(({ status, parseBody }) => {
      expect(status).to.be.eq(200);
      expect(parseBody.products).to.be.an("array").not.to.be.empty;
      expect(parseBody).to.have.property("products");
      const firstProduct = parseBody.products[0];
      expect(firstProduct).to.have.property("category");
      expect(firstProduct).to.have.property("price");
      expect(firstProduct).to.have.property("brand");
    });
  });

  it("should POST to all the product list", () => {
    cy.apiRequest(
      "POST",
      "https://automationexercise.com/api/productsList"
    ).then(({ parseBody }) => {
      expect(parseBody.responseCode).to.be.eq(405);
      expect(parseBody.message).to.eq("This request method is not supported.");
    });
  });

  it("should GET all brand list", () => {
    cy.apiRequest("GET", "https://automationexercise.com/api/brandsList").then(
      ({ status, parseBody }) => {
        expect(status).to.be.eq(200);
        expect(parseBody).to.have.property("brands");
      }
    );
  });

  it("should PUT to All brand list", () => {
    cy.apiRequest("PUT", "https://automationexercise.com/api/brandsList").then(
      ({ parseBody }) => {
        expect(parseBody.responseCode).to.be.eq(405);
        expect(parseBody.message).to.eq(
          "This request method is not supported."
        );
      }
    );
  });

  it.skip("just practice", () => {
    cy.intercept("GET", "https://automationexercise.com/api/productsList", {
      statusCode: 200,
      body: [{ id: 1, name: "Blue Top" }],
    }).as("getProductName");
    cy.accessUrl();
    cy.navigateTo("Home", "/");
    cy.addToCart();
    //  cy.visit("/add_to_cart/1");
    cy.wait("@getProductName").its("response.statusCode").should("eq", 200);
  });

  it("should POST to search product", () => {
    cy.apiRequest("POST", "https://automationexercise.com/api/searchProduct", {
      search_product: "top",
    }).then(({ status }) => {
      expect(status).to.be.eq(200);
    });
  });

  it("should POST to search product without search product params", () => {
    cy.apiRequest(
      "POST",
      "https://automationexercise.com/api/searchProduct",
      true,
      {}
    ).then(({ parseBody }) => {
      expect(parseBody.responseCode).to.be.eq(400);
      expect(parseBody.message).to.eq(
        "Bad request, search_product parameter is missing in POST request."
      );
    });
  });

  it("should verify login with valid credentials", () => {
    cy.apiRequest("POST", "https://automationexercise.com/api/verifyLogin", {
      body: {
        email: "testUsers2272025+2@example.com",
        password: "Password123",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      form: true,
    }).then(({ status, parseBody }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(200);
      expect(parseBody.message).to.eq("User exists!");
    });
  });

  it("should DELETE to verify login", () => {
    cy.apiRequest(
      "DELETE",
      "https://automationexercise.com/api/verifyLogin"
    ).then(({ status, parseBody }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(405);
      expect(parseBody.message).to.eq("This request method is not supported.");
    });
  });

  it("should POST to verify login with invalid details", () => {
    cy.apiRequest("POST", "https://automationexercise.com/api/verifyLogin", {
      body: {
        email: "testUsers2272025+2@example.com",
        password: "invalidPassword",
      },
      form: true,
    }).then(({ status, parseBody }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(404);
      expect(parseBody.message).to.eq("User not found!");
    });
  });

  const email = `testAPI${Date.now()}@example.com`;

  it("should POST to create/register user account", () => {
    cy.apiRequest("POST", "https://automationexercise.com/api/createAccount", {
      body: {
        name: "MieApi",
        email,
        password: "PasswordAPI",
        title: "Miss",
        birth_date: "10",
        birth_month: "Jan",
        birth_year: "1990",
        firstname: "Mie",
        lastname: "Acosta",
        company: "test",
        address1: "test",
        address2: "test",
        country: "Unites States",
        zipcode: "11123",
        state: "Texas",
        city: "Houston",
        mobile_number: "123-456-5567",
      },
      form: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(({ status, parseBody }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(201);
      expect(parseBody.message).to.eq("User created!");
    });
  });

  it("should DELETE user account", () => {
    cy.apiRequest(
      "DELETE",
      "https://automationexercise.com/api/deleteAccount",
      {
        body: {
          email: email,
          password: "PasswordAPI",
        },
        form: true,
      }
    ).then(({ parseBody, status }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(200);
      expect(parseBody.message).to.eq("Account deleted!");
    });
  });

  it("should PUT to update user account", () => {
    cy.createUserAccountAPI(email).then(({ parseBody }) => {
      expect(parseBody.responseCode).to.eq(201);
      expect(parseBody.message).to.eq("User created!");
    });

    cy.apiRequest("PUT", "https://automationexercise.com/api/updateAccount", {
      body: {
        name: "MieQA",
        email,
        password: "PasswordAPI",
        title: "Mr",
        birth_date: "10",
        birth_month: "Jan",
        birth_year: "1990",
        firstname: "Mieupdate",
        lastname: "Acosta",
        company: "test",
        address1: "test",
        address2: "test",
        country: "Unites States",
        zipcode: "11123",
        state: "Texas",
        city: "Houston",
        mobile_number: "123-456-5567",
      },
      form: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(({ parseBody, status }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(200);
      expect(parseBody.message).to.eq("User updated!");
    });
  });

  it("should GET user account details", () => {
    const email = "testUsers2272025+2@example.com";
    const encodedEmail = encodeURIComponent(email);
    cy.apiRequest(
      "GET",
      `https://automationexercise.com/api/getUserDetailByEmail?email=${encodedEmail}`
    ).then(({ parseBody, status }) => {
      expect(status).to.eq(200);
      expect(parseBody.responseCode).to.eq(200);
      expect(parseBody.user.email).to.eq(email);
      expect(parseBody.user.first_name).to.eq("Mietest");
      expect(parseBody.user.name).to.eq("testUsers_2272025");
      expect(parseBody.user.country).to.eq("United States");
    });
  });
});
