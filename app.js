const auth = "563492ad6f91700001000001aefde821b4794bafa65c8141c965f63f";
const gallery = document.querySelector(".gallery");
const serachInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let searchValue;
const more = document.querySelector(".more");
let page = 1;
let fetchLink;
let currentSearch;

//input eventListerer
serachInput.addEventListener("input", updateForm);
//form eventlisterer
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  console.log(searchValue);
  searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateForm(e) {
  // console.log(e.target.value);
  searchValue = e.target.value;
}

//refacotring
async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await dataFetch.json();
  return data;
}

function generatePictures(data) {
  // console.log(data.photos);
  data.photos.forEach((photo) => {
    // console.log(photo);
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
      <div class="gallery-info">
      <p>${photo.photographer}</p>
      <a href=${photo.src.original}>DownLoad</a>
      </div>
      <img src=${photo.src.large}></img>`;
    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

//search photo
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = ""; //galleryのdivタグの中身を全て消す。
  serachInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
