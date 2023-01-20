$(document).ready(function() {
	//setup multiple rows of colours, can also add and remove while spinning but overall this is easier.
  import_images();
	initWheel();
  setTimeout(spinWheel, 3 * 1000);
  });

list_rar = ['rare', 'legendary', 'epic', 'uncommon', 'common']
window.list_rar

function import_images(){
  
  function import_list(){
    $.ajax({
      url: 'https://fortnite-api.com/v2/shop/br'
    }).done(data => {
      var list_img = [];
      function cam1(q){
        if (window.list_rar.includes(q)){
          return q;
        }
        else{
          return null;
        }
      }
      for(var x = 0; x < data["data"]["featured"]["entries"].length; x++){
        if(data["data"]["featured"]["entries"][x]["bundle"] != null){
          list_img.push(
            {
              "image":`${data["data"]["featured"]["entries"][x]["newDisplayAsset"]["materialInstances"][0]["images"]["Background"]}`,
              "finalPrice": data["data"]["featured"]["entries"][x]["finalPrice"],
              "rarity": null
            }
            );
        }
        else{
          list_img.push(
            {
              "image":`${data["data"]["featured"]["entries"][x]["newDisplayAsset"]["materialInstances"][0]["images"]["Background"]}`,
              "finalPrice": data["data"]["featured"]["entries"][x]["finalPrice"],
              "rarity": cam1(data["data"]["featured"]["entries"][x]["items"][0]["rarity"]["value"])
            }
          );
        }
      }
      
      for(var x = 0; x < data["data"]["daily"]["entries"].length; x++){
        if(data["data"]["daily"]["entries"][x]["bundle"] != null){
          list_img.push(
            {
              "image":`${data["data"]["daily"]["entries"][x]["newDisplayAsset"]["materialInstances"][0]["images"]["Background"]}`,
              "finalPrice": data["data"]["daily"]["entries"][x]["finalPrice"],
              "rarity": null
            }
          );
        }
        else{
          list_img.push(
            {
              "image":`${data["data"]["daily"]["entries"][x]["newDisplayAsset"]["materialInstances"][0]["images"]["Background"]}`,
              "finalPrice": data["data"]["daily"]["entries"][x]["finalPrice"],
              "rarity": cam1(data["data"]["daily"]["entries"][x]["items"][0]["rarity"]["value"])
            }  
          );
        }
      }
      
      for(var x = 0; x < data["data"]["specialFeatured"]["entries"].length; x++){
        if(data["data"]["specialFeatured"]["entries"][x]["bundle"] != null){
          list_img.push(
            {
              "image":`${data["data"]["specialFeatured"]["entries"][x]["newDisplayAsset"]["materialInstances"][0]["images"]["Background"]}`,
              "finalPrice": data["data"]["specialFeatured"]["entries"][x]["finalPrice"],
              "rarity": null
            }
          );
        }
        else{
          list_img.push(
            {
              "image":`${data["data"]["specialFeatured"]["entries"][x]["newDisplayAsset"]["materialInstances"][0]["images"]["Background"]}`,
              "finalPrice": data["data"]["specialFeatured"]["entries"][x]["finalPrice"],
              "rarity": cam1(data["data"]["specialFeatured"]["entries"][x]["items"][0]["rarity"]["value"])
            }
          );
        }
      }
      
      data_img(list_img);
    });
  }

  function data_img(data){
    window.List_img = data;
    var row = "";
    row += "<div class='row'>";

    for(var x = 0; x < data.length; x++){
      row += `  <div class='card'>
                  <div class='rar_${data[x]["rarity"]}' id='rart'>
                    <h3>${data[x]["finalPrice"]}</h3>
                  </div>
                  <div class='vb' id='vbuks'>
                    <img  src='https://fortnite-api.com/images/vbuck.png'>
                  </div>
                  <div class='aa' id='aaa'>
                    <img src='${data[x]["image"]}'>
                  </div>
                  
                  
                </div>`;
    }

    row += "</div>";
    initWheel(row);
  }
  import_list();
}

function initWheel(row){
	var $wheel = $('.roulette-wrapper .wheel');

	for(var x = 0; x < 29; x++){
  	$wheel.append(row);
  }
  
}

function generate_order(){
  const impo = window.List_img.length;
  const r = Array.from({length: impo}, (_, i) => i + 1);

  const one = [];
  const two = [];
  const final = [];

  for (let i = 0; i < Math.ceil(r.length / 2); i++) {
      two.push(r[i]);
  }
  for (let i = Math.ceil(r.length / 2); i < r.length; i++) {
      one.push(r[i]);
  }

  for (let i = 0; i < one.length; i++) {
      final.push(one[i]);
  }
  for (let i = 0; i < two.length; i++) {
      final.push(two[i]);
  }
  return(final);
}

function getRandomNumber() {
  const groups = [1, 2, 3, 4, 5, 6];
  const chances = [0.6, 0.2, 0.1, 0.05, 0.02, 0.01];
  const price = {
    1: 500,
    2: [500, 800],
    3: [800, 1000],
    4: [1000, 1500], 
    5: [1500, 2000], 
    6: 2000
  }
  let randomNumber = Math.random();
  let cumulativeChance = 0;

  for (let i = 0; i < groups.length; i++) {
    cumulativeChance += chances[i];
    if (randomNumber < cumulativeChance) {
      if (groups[i] == 1){
        var inden = [];
        for(var x = 0; x < window.List_img.length; x++){
          if (window.List_img[x]["finalPrice"] <= price[groups[i]]){
            inden.push(window.List_img[x]);
          }
        }
        var prize = inden[Math.floor(Math.random() * inden.length) +1]
        if (window.List_img.indexOf(prize) != -1){
          console.log(window.List_img.indexOf(prize), prize);
          return(window.List_img.indexOf(prize));
        }
        
      }
      else if(groups[i] == 6){
        var inden = [];
        for(var x = 0; x < window.List_img.length; x++){
          if (window.List_img[x]["finalPrice"] >= price[groups[i]]){
            inden.push(window.List_img[x]);
          }
        }
        var prize = inden[Math.floor(Math.random() * inden.length) +1]
        if (window.List_img.indexOf(prize) != -1){
          console.log(window.List_img.indexOf(prize), prize);
          return(window.List_img.indexOf(prize));
        }
      }
      else{
        var inden = [];
        for(var x = 0; x < window.List_img.length; x++){
          if (window.List_img[x]["finalPrice"] >= price[groups[i]][0] && window.List_img[x]["finalPrice"] <= price[groups[i]][1]){
            inden.push(window.List_img[x]);
          }
        }
        var prize = inden[Math.floor(Math.random() * inden.length) +1]
        if (window.List_img.indexOf(prize) != -1){
          console.log(window.List_img.indexOf(prize), prize);
          return(window.List_img.indexOf(prize));
        }
      }
    }
  }
}

function spinWheel(){
  var roll = getRandomNumber() +  2;
  console.log(roll);
  var $wheel = $('.roulette-wrapper .wheel'),
  		order = generate_order(),
      position = order.indexOf(roll),
      size_card = 306;
  //determine position where to land
  var rows = 12,
  		card = 300 + 3 * 2,
      landingPosition = (rows * window.List_img.length * card) + (position * card);
  
  var randomize = Math.floor(Math.random() * 300) - (300/2);
  
  landingPosition = landingPosition + randomize;
    
  var object = {
		x: Math.floor(Math.random() * 50) / 100,
    y: Math.floor(Math.random() * 20) / 100
	};


  $wheel.css({
		'transition-timing-function':'cubic-bezier(0,'+ object.x +','+ object.y + ',1)',
		'transition-duration':'10s',
		'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
	});
  
  setTimeout(function(){
		$wheel.css({
			'transition-timing-function':'',
			'transition-duration':'',
		});
    
    var resetTo = -(position * card + randomize);
		$wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
  }, 10 * 1000);
}
