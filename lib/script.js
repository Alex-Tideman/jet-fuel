const $urlDisplay = $('.url-list');
const $folderNav = $('.folder-nav');
const host = window.location.origin;
let mostPopularAreOnTop = true;
let mostRecentAreOnTop = false;

$('.submit-button').on('click', (e) => {
  e.preventDefault();
  let longUrl = $('.long-url').val();
  let data = {
    longUrl: longUrl
  };
  $.post('/urls', data)
    .then(turnUrlsIntoElements)
    .then(displayUserUrl)
    .catch((err) => console.error(err));
  $('.long-url').val('');
});

$('.long-url').on('keyup', () => {
  let longUrl = $('.long-url').val();
  $('.submit-button').attr('disabled', !longUrl);
});

const displayUserUrl = (arr) => {
  let userURL = arr[arr.length - 1];
  $('.tiny-url').html(userURL);
};

$('.sort-by-clicks-button').on('click', () => {
  mostPopularAreOnTop = !mostPopularAreOnTop;
  displayByPopularity();
});

$('.sort-by-time-button').on('click', ()=>{
  mostRecentAreOnTop = !mostRecentAreOnTop;
  displayByTimestamp();
});

$('.search-input').on('keyup', function() {
  let filter = $(this).val();
  $('.link-row').each(function() {
    if($(this).text().search(new RegExp(filter, 'i')) < 0) {
      $(this).fadeOut();
    } else {
      $(this).fadeIn();
    }
  });
});

const displayByPopularity = () => {
  $.getJSON('/urls')
    .then(sortByClicks)
    .then(turnUrlsIntoElements)
    .then(putUrlOnPage)
    .catch((err) => console.error(err));
};

const sortByClicks = (response) => {
  return mostPopularAreOnTop ? response.sort((a, b) => b.clicks - a.clicks) : response.sort((a, b) => a.clicks - b.clicks);
};

const sortByTimestamp = (response) => {
  return mostRecentAreOnTop ? response.sort((a, b) => b.created_at - a.created_at) : response.sort((a, b) => a.created_at - b.created_at);
};

const displayByTimestamp = () => {
  $.getJSON('/folders/1')
  .then(sortByTimestamp)
  .then(turnUrlsIntoElements)
  .then(putUrlOnPage)
  .catch((err) => console.error(err));
};

const displayAllFolders = () => {
  $.getJSON('/folders')
  .then(turnFoldersIntoElements)
  .then(putFoldersOnPage)
  .catch((err) => console.error(err));
};


const displayAllFolderUrls = () => {
  $.getJSON('/folders/2')
    .then(sortByClicks)
    .then(turnUrlsIntoElements)
    .then(putUrlOnPage)
    .catch((err) => console.error(err));
};

const turnFoldersIntoElements = (response) => {
  return response.map((folder) => $(`<a href='/folders/${folder.id}'>${folder.name}</a>`) );
};

const turnUrlsIntoElements = (response) => {
  return response.map((link) => $(`<tr class='link-row'>
    <td><a href='/urls/${link.id}'>${host}/${link.id}</a></td>
    <td>Links to: ${link.long_url}</td>
    <td>Clicks: ${link.clicks}</td>
    <td>Created: ${new Date(link.created_at)}</td></tr>`) );
};

const putUrlOnPage = (element) => {
  $urlDisplay.html(element);
};

const putFoldersOnPage = (element) => {
  $folderNav.html(element);
};


displayAllFolders();
displayAllFolderUrls();
