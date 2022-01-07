window.addEventListener("load",async function yc_run(){

  //alert("it works")
    
  const app = window.yc_app;
  const today = new Date()
  const host = "https://"+app+".yo.city/"


  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [month, day, year].join('/');
}


function formatTime(d) {
  var date = new Date(d);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

   // Yo City LIST

    let listDiv = document.getElementById("yc_list");

    if(listDiv){
      let listID = listDiv.getAttribute("list");
      let itemLink = listDiv.getAttribute("item-link");
      let imageSize = listDiv.getAttribute("image-size");
   
  
      let listData;
      await fetch(host+"categories/"+listID+"?upcoming=1")
      .then(response => response.json())
      .then(data => {
        listData = data
        // console.log(data)
      });
  
  
      let content = `
      <style>
      .yc_list{
        padding:5px;
        text-align:center;
      }
      .yc_list_title{
  
      }
      .yc_list_item{
        padding:10px;
        display:inline-block;
        text-align:left;
      }
      .yc_card{
        width:325px;
        height:325px; 
        background-color:#ccc; 
        border-radius:8px; 
        overflow:hidden;
        -webkit-box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.08); 
        box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.08);
  
      }
      .yc_card_image_box{
        width:100%;
        height:100%;
      }
      `; 
      if(imageSize == "contain"){
        content += `
      .yc_card_image{
        width:100%; 
        height:100%; 
        background-size:contain;
        background-position:center;
        background-repeat: no-repeat;
        -webkit-box-shadow: inset 0px -120px 33px -30px #000000; 
        box-shadow: inset 0px -120px 33px -30px #000000;
        position: relative;
      }
      `;
    }else{
      content += `
      .yc_card_image{
        width:100%; 
        height:100%; 
        background-size:cover;
        background-position:center;
        background-repeat: no-repeat;
        -webkit-box-shadow: inset 0px -120px 33px -30px #000000; 
        box-shadow: inset 0px -120px 33px -30px #000000;
        position: relative;
      }
      `;
    }
  
    content +=`
    .yc_card_title_box{
        color:white;
        position: absolute;
        bottom: 0;
        left: 0;
        padding:5px;
      }
      .yc_card_title{
        font-weight:bold;
      }
      .yc_card_dates{
        font-size:small;
      }
  
      </style>
  
      <div class="yc_list" >
                    <div class="yc_list_title">
                    <h3>
                      `+ listData.name +`
                    </h3>
                    </div>
                    `;
  
      for(let i of listData.linkedEvents){
        let itemType = "events";
  
        let link = itemLink.replace("[item-id]", itemType + '-' + i.id) 
  
  
        let heroImage = i.heroImage.url
        
        if(i.heroImage.formats.thumbnail){
          heroImage = i.heroImage.formats.thumbnail.url;
        }
  
        if(i.heroImage.formats.small){
          heroImage = i.heroImage.formats.small.url;
        }
  
            content += `
            <div class="yc_list_item" >
            <a href="`+ link +`">
              <div class="yc_card" >
              <div class="yc_card_image_box">
              <div class="yc_card_image" style="background-image: url('`+ heroImage +`');">
              <div class="yc_card_title_box">
              <div class="yc_card_title">
              ` + i.name + `
                </div>
                `;
  
                if(i.startDate){
                  content +=`
                  
                    <div class="yc_card_dates">
                `+
                formatDate(i.startDate) +` - ` + formatDate(i.endDate)
                +`
                </div>
                  `;
                }
              content += `
                </div>
              </div>
              </div>
           
              </div>
                </a>
            </div>
        `;
  
      }

      for(let i of listData.linkedPlaces){
        let itemType = "places";
  
        let link = itemLink.replace("[item-id]", itemType + '-' + i.id) 
  
  
        let heroImage = i.heroImage.url
        
        if(i.heroImage.formats.thumbnail){
          heroImage = i.heroImage.formats.thumbnail.url;
        }
  
        if(i.heroImage.formats.small){
          heroImage = i.heroImage.formats.small.url;
        }
  
            content += `
            <div class="yc_list_item" >
            <a href="`+ link +`">
              <div class="yc_card" >
              <div class="yc_card_image_box">
              <div class="yc_card_image" style="background-image: url('`+ heroImage +`');">
              <div class="yc_card_title_box">
              <div class="yc_card_title">
              ` + i.name + `
                </div>
                `;
  
                if(i.startDate){
                  content +=`
                  
                    <div class="yc_card_dates">
                `+
                formatDate(i.startDate) +` - ` + formatDate(i.endDate)
                +`
                </div>
                  `;
                }
              content += `
                </div>
              </div>
              </div>
           
              </div>
                </a>
            </div>
        `;
  
      }
  
  
      content += `</div>`
  
      listDiv.innerHTML = content; 
    }

 
    // Yo City ITEM
    
    let itemDiv = document.getElementById("yc_item");
    
    //let itemID = listDiv.getAttribute("list");
    if(itemDiv){
      let itemIdString = itemDiv.getAttribute("item-id");
      let itemId = itemIdString.split("-");
      let type = itemId[0];
      let id = itemId[1];
      let dateId = itemId[2];
      let itemData;

      if(type){
        await fetch(host+type+"/"+id)
        .then(response => response.json())
        .then(data => {
          itemData = data
         //  console.log(data)
        });
      }
      let date;
      if(dateId){
     
        for(let d of itemData.dates){
          if(d.id = dateId){
           date = d;
          }
        }
        // console.log("date",date) 
      }

      let heroImage = itemData.heroImage.url;
      if(itemData.heroImage.formats.medium){
        heroImage = itemData.heroImage.formats.medium.url;
      }


        let itemContent = `
      <style>
      .yc_item{
        width:100%;
      }
      .yc_item_box{
        margin: auto;
        width: 100%;
        max-width:800px;
        text-align:center;
      }
      .yc_item_image{
        width:auto;
        border-radius:10px;
        -webkit-box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.08); 
        box-shadow: 0px 0px 12px 5px rgba(0,0,0,0.08);
        max-height:600px;
      }
      .yc_item_title{
        text-align:left;
        padding:10px 30px 15px 30px;
      }
      .yc_item_dates{
        padding:20px 20px 20px 24px;
        width:100%;
      }
      .yc_item_date_box{
        display: inline-block;
        border: solid 3px #343a40;
        border-radius:6px;
        width:45%;
        margin: 10px;
        padding:5px;

      }
      .yc_item_date{
        font-weight:bold;
        font-size:x-large;
      }
      .yc_item_address{
        display:inline-block;
        padding:5px 140px 5px 20px;
        text-align:left;
        width:40%;
        min-width:200px;

      }
      .yc_item_description{
        padding:5px 20px 20px 20px;
        text-align:left;
      }
      .yc_item_description hr {
        border: none;
        border-top: 3px double #343a40;
        color: #343a40;
        overflow: visible;
        text-align: center;
        height: 5px;
      }
      .yc_item_contact{
        text-align:left;
      }
      .yc_item_icons{
        width:59%;
        min-width:200px;
        display:inline-block;
        text-align:right;
        padding:5px 20px 5px 20px;
      }
      .yc_item_icon_box{
        
        text-align:center;
        display:inline-block;
        padding:10px;
        margin-left:30px;
      }
      .yc_item_icon_box a{
        text-decoration: none;
        color: unset;
      }
      .yc_item_icon{
        padding:5px;
      }
      .yc_item_icon_title{
           font-size:small;
      }
      </style>

      <div class="yc_item">
      <div class="yc_item_box">
      <div class="yc_item_title">
      <h2>
      `+ itemData.name +`
      </h2>
      </div>
      <img src="`+heroImage+`" class="yc_item_image" />
      `;

      if(date){
        itemContent += `
        <div class="yc_item_dates">
          <div class="yc_item_date_box">
            <div class="yc_item_date_title">
              from
            </div>
            <div class="yc_item_date">
              `+ formatDate(date.StartDate) +`
            </div>
            <div class="yc_item_time">
              `+ formatTime(date.StartDate) +`
            </div>
          </div>
          <div class="yc_item_date_box">
            <div class="yc_item_date_title">
              to
            </div>
            <div class="yc_item_date">
              `+ formatDate(date.EndDate) +`
            </div>
            <div class="yc_item_time">
              `+ formatTime(date.EndDate) +`
            </div>
          </div>
        </div>
        `;
      }

      itemContent += `
      <div class="yc_item_contact">
      <div class="yc_item_address">
        `+ itemData.address1 +` <br/>
       `;
       
      if(itemData.address2){
       itemContent += itemData.address2 +`<br/>`;
      }

      if(itemData.city){
        itemContent += itemData.city +`, `;
       }
       if(itemData.state){
        itemContent += itemData.city +` `;
       }
       if(itemData.zip){
        itemContent += itemData.zip;
       }

       itemContent +=`
      </div>
      <div class="yc_item_icons">
      `;
       if(itemData.website){
        itemContent += `
        <div class="yc_item_icon_box"> 
        <a href="`+itemData.website+`" target="_blank"> 
        <div class="yc_item_icon"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>
        </div>
        <div class="yc_item_icon_title">   
        Website 
        </div>
        </a>
        </div>
        `;
       }

       if(itemData.contactPhone){
        itemContent += `
        <div class="yc_item_icon_box">
        <a tel="`+itemData.contactPhone+`" target="_blank"> 
        <div class="yc_item_icon"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
        </svg>
        </div>
        <div class="yc_item_icon_title">   
         `+itemData.contactPhone+` 
         </div>
         </a>
        </div>
        `;
       }

       if(itemData.address1){
        itemContent += `
        <div class="yc_item_icon_box">
        <a href="https://maps.google.com/?q=`+itemData.address1+`,`+itemData.address2+`, `+itemData.city+`, `+itemData.state+`, `+itemData.zip+`" target="_blank"> 
        <div class="yc_item_icon"> 
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
        </svg>
        </div>
        <div class="yc_item_icon_title">   
        Directions 
        </div>
     
        </a>
        </div>
        `;
       }

       //https://icons.getbootstrap.com/bootstrap-icons.svg#alarm

      itemContent +=`
      </div>
      </div>
      <div class="yc_item_description">
      <hr>
       `+ itemData.description +`
      </div>

      </div>
    `;

  

    itemContent += `</div>`;

    itemDiv.innerHTML = itemContent; 
    }


}, false);