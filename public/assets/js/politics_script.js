
$(document).ready(function () {
    //make sure everything is loaded before we start

    /////////////// *********index***********/////////////////
    $("#signIn").on("submit", function (event) {
        event.preventDefault();
        var signIn = {
            email: $("#signInEmail").val().trim(),
            password: $("#signInPassword").val().trim()
        }
        login(signIn);
    })
    login = data => {

        $.get("/api/login/" + data.email + "/" + data.password, function (res) {
            console.log(res);
            window.location = "/api/user/" + res;
        })
    }


    ///////////////****** Search pages*********////////////

    //////////house
    $("#createQuery").on("click", function (event) {
        event.preventDefault();

        // INSTANTIATE QUERY OBJECT HANDLING USER INPUT
        var query = {
            branch: $("#byBranch").val().trim(),
            party: $("#byParty").val().trim(),
            state: $("#byState").val().trim(),
            gender: $("#byGender").val().trim(),
            name: $("#byname").val().trim()
        };
        // console.log(query);
        // INSTANTIATE GLOBAL VARIABLES FOR FUTURE USE
        var partyAbrv;
        var searchState;
        var genderAbrv;
        var searchName;

        // VALIDATIONS
        if (!query.branch && !query.party && !query.state && !query.gender && !query.name) {
            console.log("this an empty query my friend")
        }
        else if (!query.branch) {
            console.log("You must choose one branch to search.")
        } else {
            switch (query.branch) {
                case "Senate":

                    function handleUserInput() {
                        // ABBREVIATES PARTY NAME FOR QUERY
                        if (query.party === "Democrats") {
                            partyAbrv = "D";
                        } else if (query.party === "Republicans") {
                            partyAbrv = "R";
                        } else if (query.party === "Independents") {
                            partyAbrv = "ID"
                        } else if (!query.party) {
                            partyAbrv = "empty"
                        }
                        // IF STATE BLANK
                        if (!query.state) {
                            searchState = "empty";
                        } else {
                            searchState = query.state;
                        }
                        // ABBREVIATES GENDER FOR QUERY
                        if (query.gender === "Male") {
                            genderAbrv = "M";
                        } else if (query.gender === "Female") {
                            genderAbrv = "F";
                        } else if (!query.gender) {
                            genderAbrv = "empty";
                        }
                        // IF NAME BLANK
                        if (!query.name) {
                            searchName = "empty";
                        } else {
                            searchName = query.name;
                        }
                    }

                    handleUserInput();

                    var queryString = "/api/senator/" +
                        partyAbrv + "/" +
                        searchState + "/" +
                        genderAbrv + "/"
                        + searchName;

                    $.get(queryString, function (data) {

                        // console.log(data);
                        $("#table").empty();
                        newRow = $("<tr>");
                        newRow.append("<th>Name</th>");
                        newRow.append("<th>State</th>");
                        newRow.append("<th>Party</th>");
                        newRow.append("<th>Gender</th>");
                        $("#table").append(newRow);
                        for (let i = 0; i < data.length; i++) {
                            dataRow = $("<tr class='member'>");
                            dataRow.append("<td id=" + data[i].fecId + ">" + data[i].name + "</td>");
                            dataRow.append("<td>" + data[i].state + "</td>");
                            dataRow.append("<td>" + data[i].party + "</td>");
                            dataRow.append("<td>" + data[i].gender + "</td>");
                            $("#table").append(dataRow);
                        }
                    })
                    break;

                case "House of Representatives":
                    // console.log("You're searching the House of Representatives!");
                    function handleUserInput() {
                        // ABBREVIATES PARTY NAME FOR QUERY
                        if (query.party === "Democrats") {
                            partyAbrv = "D";
                        } else if (query.party === "Republicans") {
                            partyAbrv = "R";
                        } else if (query.party === "Independents") {
                            partyAbrv = "ID"
                        } else if (!query.party) {
                            partyAbrv = "empty"
                        }
                        // IF STATE BLANK
                        if (!query.state) {
                            searchState = "empty";
                        } else {
                            searchState = query.state;
                        }
                        // ABBREVIATES GENDER FOR QUERY
                        if (query.gender === "Male") {
                            genderAbrv = "M";
                        } else if (query.gender === "Female") {
                            genderAbrv = "F";
                        } else if (!query.gender) {
                            genderAbrv = "empty";
                        }
                        // IF NAME BLANK
                        if (!query.name) {
                            searchName = "empty";
                        } else {
                            searchName = query.name;
                        }
                    }

                    handleUserInput();

                    var queryString = "/api/representative/" +
                        partyAbrv + "/" +
                        searchState + "/" +
                        genderAbrv + "/"
                        + searchName;

                    $.get(queryString, function (data) {
                        // console.log(data)
                        $("#table").empty();
                        newRow = $("<tr>");
                        newRow.append("<th>Name</th>");
                        newRow.append("<th>State</th>");
                        newRow.append("<th>District</th>");
                        newRow.append("<th>Party</th>");
                        newRow.append("<th>Gender</th>");
                        $("#table").append(newRow);
                        // console.log(newRow);
                        for (let i = 0; i < data.length; i++) {
                            dataRow = $("<tr class=rep>");
                            dataRow.append("<td id=" + data[i].fecId + ">" + data[i].name + "</td>");
                            dataRow.append("<td>" + data[i].state + "</td>");
                            dataRow.append("<td>" + data[i].district + "</td>");
                            dataRow.append("<td>" + data[i].party + "</td>");
                            dataRow.append("<td>" + data[i].gender + "</td>");
                            // console.log(dataRow);
                            $("#table").append(dataRow);
                        }

                    })
            }
        };
    })
///
loadSenator = event => {
    let query= "/api/senatorprofile/"+event.target.id;
    window.location=query;
}
loadRep = event => {
    let query = "/api/representativeprofile/"+event.target.id;
    window.location=query;
}
//
    /////////handle table clicks////////
    $(document).on("click", ".member", loadSenator);
    $(document).on("click", ".rep", loadRep)
  

    ////////////// //*********************SIGN UP ******/ ////////////// 
    $("#newUser").on("click", function (event) {
        event.preventDefault();
        //client side verification is missing
        var newCredential = {
            name: $("#username").val().trim(),
            location: $("#location").val().trim(),
            email: $("#email").val().trim(),
            password: $("#password").val().trim()
        }
        addCredential(newCredential);
    })


    addCredential = (data) => {

        $.post("/api/addcredential", data).then(res => {
            // window.location.reload();
        })
        document.location.reload();
    }
    // end of doc ready listener, DONT TOUCH THIS
})





