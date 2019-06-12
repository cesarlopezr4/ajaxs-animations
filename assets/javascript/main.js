// Grabbing and storing the data-animal property value from the button

var animals = ["dog", "cat", "goat", "bird","monkey","parrot","owl","donkey","horse","wolf","rabitt","elefant","lion","turtle","hamster","deer","Gator","possum","kanguro"];


            // displayMovieInfo function re-renders the HTML to display the appropriate content
            function displayAnimalInfo() {
                // Adding click event listen listener to all buttons

var animal = $(this).attr("data-name");
console.log(animal);


// Constructing a queryURL using the animal name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

// Performing an AJAX request with the queryURL
$.ajax({
    url: queryURL,
    method: "GET"
})
    // After data comes back from the request
    .then(function (response) {
        console.log("this is running")
        // storing the data from the AJAX request in the results variable
        var results = response.data;

        // Looping through each result item
        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var animalDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var animalImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;


            // add states of animate and still which will be switched 

            
            animalImage.attr("src",still);

            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass ("animal-image");




            // Appending the paragraph and image tag to the animalDiv
            animalDiv.append(p);
            animalDiv.append(animalImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gift-appear-here").prepend(animalDiv);
        }
    });


}
//Function for displaying animal data

function renderButtons() {

// Deleting the animal prior to adding new animal
// (this is necessary otherwise you will have repeat buttons)
$("#buttons-view").empty();

// Looping through the array of Animals
for (var i = 0; i < animals.length; i++) {

// Then dynamicaly generating buttons for each movie in the array
// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
var a = $("<button>");
// Adding a class of animal-btn to our button

a.addClass("animal");
// Adding a data-attribute

a.attr("data-name", animals[i]);
// Providing the initial button text
a.text(animals[i]);

// Adding the button to the buttons-view div
$("#buttons-view").append(a);

}
}

// This function handles events where a animal button is clicked
$("#add-animal").on("click", function (event) {
event.preventDefault();
// This line grabs the input from the textbox


var animal = $("#animal-input").val().trim();

// Adding animal from the textbox to our array

animals.push(animal);

// Calling renderButtons which handles the processing of our movie array
renderButtons();
});


// when a 'still' image it's clicked it cbecome animate, or still again if it's clicked when is 'animated'
$(document).on("click", ".animal-image", function () {
          
          

// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
$(this).attr("src", $(this).attr("data-animate"));
$(this).attr("data-state", "animate");
} else {
$(this).attr("src", $(this).attr("data-still"));
$(this).attr("data-state", "still");

}

console.log(state);

});




// Adding a click event listener to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);

// $("buttons-view").on("click", displayAnimalInfo);


// Calling the renderButtons function to display the intial buttons
renderButtons();