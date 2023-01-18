$(document).ready(function() {
	//setup multiple rows of colours, can also add and remove while spinning but overall this is easier.
  import_images();
	initWheel();
 
 	$('button').on('click', function(){
		var outcome = parseInt($('input').val());
    spinWheel(outcome);
  });
});

function import_images(){
  
  function import_list(){
    $.ajax({
      url: 'https://fortnite-api.com/v2/shop/br'
    }).done(data => {
      var list_img = [];

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
              "rarity": data["data"]["featured"]["entries"][x]["items"][0]["rarity"]["value"]
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
              "rarity": data["data"]["daily"]["entries"][x]["items"][0]["rarity"]["value"]
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
              "rarity": data["data"]["specialFeatured"]["entries"][x]["items"][0]["rarity"]["value"]
            }
          );
        }
      }
      
      data_img(list_img);
    });
  }

  function data_img(data){
    window.List_img = data;
    console.log(data.length);
    var row = "";
    row += "<div class='row'>";

    for(var x = 0; x < data.length; x++){
      row += `  <div class='card'><div class='rar_${data[x]["rarity"]}'><h3>${data[x]["finalPrice"]}</h3></div><img src='${data[x]["image"]}'></div>`;
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
  console.log(window.List_img);
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

function spinWheel(rol){
  var roll = Math.random(window.List_img.length);
  console.log(roll);
  var $wheel = $('.roulette-wrapper .wheel'),
  		order = generate_order(),
      position = order.indexOf(roll);
            
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
		'transition-duration':'6s',
		'transform':'translate3d(-'+landingPosition+'px, 0px, 0px)'
	});
  
  setTimeout(function(){
		$wheel.css({
			'transition-timing-function':'',
			'transition-duration':'',
		});
    
    var resetTo = -(position * card + randomize);
		$wheel.css('transform', 'translate3d('+resetTo+'px, 0px, 0px)');
  }, 6 * 1000);
}