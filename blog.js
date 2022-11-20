let monthName = [
  "Jan", 
  "Feb", 
  "Mar", 
  "Apr", 
  "May", 
  "Jun", 
  "Jul", 
  "Aug", 
  "Sep", 
  "Oct", 
  "Nov", 
  "Des" 
]

let blogs = [];

function addBlog(event) {
  event.preventDefault();

  let title = document.getElementById('input-blog-title').value;
  let content = document.getElementById('input-blog-content').value;
  let image = document.getElementById('input-blog-image');
  var checkBoxes = document.querySelectorAll('input[type="checkbox"]'); // get all the check box
  let startdate = document.getElementById('std').value;
  let enddate = document.getElementById('etd').value;

  let result = [];

  checkBoxes.forEach(test => { // loop all the checkbox item
    if (test.checked) {  //if the check box is checked
        let data = {    // create an object
            item: test.value,
            selected: test.checked
        }
        result.push(data); //stored the objects to result array
    }
})


  if (title == '' || image == '' || content == '' || checkBoxes == '' || startdate == '' || enddate=='') {
    return alert('All input fields must be not empty');
  }
  image = URL.createObjectURL(image.files[0]);

  document.getElementById('input-blog-title').value = '';
  document.getElementById('input-blog-content').value = '';
  document.getElementById('std').value = '';
  document.getElementById('etd').value = '';
  document.querySelector("form").reset()
  
  let blog = {
    author: 'Dion Novalino',
    title: title,
    image: image,
    result: result,
    content: content,
    startdate : startdate,
    enddate : enddate,
    postedAt: new Date()
  };


  blogs.push(blog);

  renderBlog();
}

function renderBlog() {
  let blogContainer = document.getElementById('contents');

  var html = '';
  

  for (let i = 0; i < blogs.length; i++) {
    html += `
      <div id="${i}" class="blog-list-item">
        <div class="blog-image">
          <img src="${blogs[i].image}" alt="" />
        </div>
        <div class="blog-content">
            <h1>
              <a href="blogdetail.html" target="_blank"
                >${blogs[i].title}</a
              >
            </h1>
            <div class="detail-blog-content"> Technologies : `;
  
            for (let c = 0; c < blogs[i].result.length; c++){
              html += blogs[i].result[c].item + ', '
            }
            html += `
              
            </div>

            <div>${konversiWaktu(blogs[i].postedAt)} | ${blogs[i].author} </div>


            <p>
              ${blogs[i].content}
            </p>
            <div id="paragraph"></div>
            <div class="sosmed-list">
              <a href="https://www.linkedin.com/in/dion-novalino-54b859214/"
                ><img src="img/linked.png" alt="facebook" target="_blank"
              /></a>
              <a href="https://www.instagram.com/dionnovalino/"
                ><img style="width: 50px;" src="img/instagram.png" alt="twitter" target="_blank"
              /></a>
              <a href="https://www.facebook.com/dion.novalino"
                ><img style="width: 35px;" src="img/facebook.png" alt="instagram" target="_blank"
              /></a>
              <a href="https://twitter.com/netikids"
                ><img style="width: 35px; margin-left: 8px;" src="img/twitter.png" alt="mail" target="_blank"
              /></a>
            </div>
            <div class="btn-group">
              <button class="btn-edit">Edit Post</button>
              <button class="btn-post">Post Blog</button>
            </div>
          </div>
          <p style="text-align: right;">
            ${selisihWaktu(blogs[i].startdate,blogs[i].enddate)}
          </p>
      </div>
      `;
  }
  blogContainer.innerHTML = html;  
}


function konversiWaktu(time) {
  let hours = time.getHours()
  let minutes = time.getMinutes()

  if (hours < 10) {
    hours = "0" + hours
  }

  if (minutes < 10) {
    minutes = "0" + minutes
  }

  return `${time.getDate()} ${monthName[time.getMonth()]} ${time.getFullYear()} ${hours}:${minutes} WIB`
}

function selisihWaktu(start, end) {
  let timestart = new Date(start)
  let timeend = new Date(end)
  
      let distance = timeend - timestart
      console.log(distance)


      let miliseconds = 1000 // 1 seconds adalah 1000 miliseconds

      let distanceMonth = Math.floor(distance / (miliseconds * 60 * 60 * 24 * 30))
      let distanceDay = Math.floor(distance / (miliseconds * 60 * 60 * 24))

      let distanceSecond = Math.floor(distance / miliseconds) // 1 seconds ago
      if(distanceMonth > 0){
        if (distanceDay % 30 >=1) {
          return `${distanceMonth} Month ${distanceMonth % 30} day`
        }
        return `${distanceMonth} Month`
      }
      else if(distanceDay>0){
        return `${distanceDay} Day`
      }
      else{
        return `0 days`
      }
      
}

setInterval(function () {
  renderBlog()
}, 1000)
