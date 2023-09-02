const handleApi = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const tabsContainer = document.getElementById("tabs-container");
    data.data.forEach(element => {
        const newTab = document.createElement("div");
        newTab.innerHTML = `<a onclick="appendById('${element.category_id}')" class="tab tab-sm md:tab-md bg-[#25252533] text-black border-none rounded-md">${element.category}</a>`;
        tabsContainer.appendChild(newTab);
    });
    appendById(1000);
}
handleApi();
const cardsContainer = document.getElementById("cards-container");
async function appendById(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    appendData(data.data);
    const sortedData = [...data.data];
    (sortedData).sort((a, b) => {
        const elementA = parseFloat(a.others.views);
        const elementB = parseFloat(b.others.views);
        return elementB - elementA;
    })
    document.getElementById("sort-by-views").addEventListener('click', function () {
        appendData(sortedData);
    });
};
async function appendData(dataToAppend) {
    cardsContainer.innerHTML = ``;
    dataToAppend.forEach(element => {
        const postedDate = parseFloat(element.others?.posted_date);
        let seconds = postedDate;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        seconds = seconds % 60;
        minutes = minutes % 60;
        let time = `${padTo2Digits(hours)}hrs ${padTo2Digits(minutes)}mins ago`;
        const newCard = document.createElement("div");
        newCard.className = "card bg-white shadow-xl w-80 lg:w-72 h-full";
        newCard.innerHTML = `
            <figure class="h-48 relative px-2 md:px-0 rounded-lg">
                <img src="${element.thumbnail}" alt="" class="w-full h-full" />
                <div class="absolute right-2 md:right-0 bottom-0 font-normal text-xs text-white bg-[#171717] ${isNaN(hours) ? 'p-0' : 'p-1'} rounded">${isNaN(hours) ? '' : time}</div>
            </figure>
            <div class="card-body px-2">
                <div class="flex justify-start items-start gap-3">
                    <figure class="h-12 w-12"><img src="${element.authors[0]?.profile_picture}" alt="" class="h-12 w-12 rounded-[50%]" /></figure>
                    <div>
                        <h2 class="card-title font-bold text-base">${element.title}</h2>
                        <div class="flex justify-start items-center gap-2">
                            <span class="font-normal text-sm text-[#171717B2]">${element.authors[0]?.profile_name}</span> <img
                                src="${(!(element.authors[0]?.verified)) ? '' : './icons/fi_10629607.png'}" alt="">
                        </div>
                        <span class="font-normal text-sm text-[#171717B2]">${element.others?.views}</span>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(newCard);
    });
    if (cardsContainer.innerHTML == '') {
        const newCard = document.createElement("div");
        newCard.className = "col-span-1 md:col-span-3 xl:col-span-4 flex flex-col justify-center items-center py-0 md:py-24 lg:py-32 2xl:py-52"
        newCard.innerHTML = `
            <img src="./icons/Icon.png" alt="">
            <p class="font-bold text-3xl text-center">Oops!! Sorry, There is no content here</p>
            `;
        cardsContainer.appendChild(newCard);
    }
};
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}
const tabsActive = document.querySelectorAll('.tab');
tabsActive.forEach(activatedTab => {
    activatedTab.addEventListener('click', () => {
        tabsActive.forEach(element => {
            if (element.classList.contains('text-white')) {
                element.classList.remove('bg-[#FF1F3D]', 'text-white');
                element.classList.add('bg-[#25252533]', 'text-black');
            }
        });
        activatedTab.classList.remove('bg-[#25252533]', 'text-black');
        activatedTab.classList.add('bg-[#FF1F3D]', 'text-white');
    });
});
