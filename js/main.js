function Cat (imgURL, name, id) {
  this.imgURL = imgURL;
  this.name = name;
  this.ID = id;
  this.numClicks = 0;
};

var catData = [["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 'Hal'],
              ["https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcToYmVQFUq8jHd2VIaNQ1H8dPD7fIPwB6L7eyO5LOSb-tQzhT58oA89c7E", 'Bob'],
              ['https://www.petfinder.com/wp-content/uploads/2012/11/101438745-cat-conjunctivitis-causes.jpg', 'Jin'],
              ['https://upload.wikimedia.org/wikipedia/commons/1/1e/Large_Siamese_cat_tosses_a_mouse.jpg', 'Joe'],
              ['http://mcdaniel.hu/wp-content/uploads/2015/01/6784063-cute-cats-hd.jpg', 'Wie']]

var allCats = [];

function createAllCats() {
  for (var i in catData) {
    var catInfo = catData[i];
    var cat = new Cat(catInfo[0], catInfo[1], i);
    allCats.push(cat);
  }
}

function incrementNumClicks(obj){
  $('img').click(function() {
    obj.numClicks += 1;
    $('.numClicks').text(obj.numClicks);
  });
}

$(document).ready(function(){
  createAllCats();
  for (var i in allCats) {
   var listElem = '<li class="name" cat-id="' + allCats[i].ID + '">' + allCats[i].name + '</li>';
   $('#cat-list').append(listElem);
  }
  $('.name').click(function() {
    var obj = allCats[$(this).attr('cat-id')];
    var displayElems = '<p>' + obj.name + '</p>' + '<p class="numClicks">' + obj.numClicks + '</p>' + '<img src="' + obj.imgURL + '"/>';
    $('.display-container').empty().append(displayElems);
    incrementNumClicks(obj);
  });
});
