function Cat (imgURL, name, id) {
  this.imgURL = imgURL;
  this.numClicks = 0;
  this.catID = id;
  this.catName = name;
  this.nameDiv = '<div class="name-div">' + this.catName + '</div>';
  this.displayDiv = '<div class="display-div"' + ' id="cat-' + this.catID + '">' +
                '<div class="cat-name">' + this.catName + '</div>' +
                '<div class="clicks-counter">' + this.numClicks + '</div>' +
                '<img class="cat-image" src="' + this.imgURL + '">' +
                '</>';
};

var catData = [["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 'Hal'],
                ["https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcToYmVQFUq8jHd2VIaNQ1H8dPD7fIPwB6L7eyO5LOSb-tQzhT58oA89c7E", 'Bob'],
                ['https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg', 'Jin']]

var allCats = [];

function createAllCats() {
  for (var i in catData) {
    var catInfo = catData[i];
    var cat = new Cat(catInfo[0], catInfo[1], i);
    allCats.push(cat);
  }
}

$(document).ready(function(){
  createAllCats();
  for (var i in allCats) {
    $('#cat-list').append(allCats[i].nameDiv).on('click', { i: i}, (function(event) {
      var iCopy = event.data.i;
      return function(iCopy) {
        alert(iCopy);
      };
    }
  ))
  };
});

//event listener for number of clicks
$(document).ready(function() {
  $('.cat-image').click(function() {
    var catID = $(event.target).parent().attr('id');
    var cat = allCats[catID.charAt(catID.length-1)];
    cat.numClicks += 1;
    $(event.target).siblings('.clicks-counter').text(cat.numClicks);
  })
})
