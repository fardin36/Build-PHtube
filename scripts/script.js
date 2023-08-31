const handleApi = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const tabsContainer = document.getElementById("tabs-container");
    data.data.forEach(element => {
        const newTab = document.createElement("div");
        newTab.innerHTML = `<a onclick="appendById('${element.category_id}')" class="tab bg-[#25252533] text-black border-none">${element.category}</a>`;
        tabsContainer.appendChild(newTab);
    });
    appendById(1000);
}

handleApi();

const cardsContainer = document.getElementById("cards-container");

async function appendById(id) {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    console.log(data.data);
    cardsContainer.innerHTML = ``;
    data.data.forEach(element => {
        const newCard = document.createElement("div");
        newCard.className = "card bg-white shadow-xl p-2 w-80 h-full";
        newCard.innerHTML = `
            <figure class="h-48"><img src="${element.thumbnail}" alt="" class="w-full h-full" /></figure>
            <div class="card-body px-0">
                <div class="flex justify-start items-start gap-3">
                    <figure class="h-12 w-12"><img src="${element.authors[0]?.profile_picture}" alt="" class="h-12 w-12 rounded-[50%]" /></figure>
                    <div>
                        <h2 class="card-title font-bold text-base">${element.title}</h2>
                        <div class="flex justify-start items-center gap-2">
                            <span class="font-normal text-sm text-[#171717B2]">${element.authors[0]?.profile_name}</span> <img
                                src="./icons/fi_10629607.png" alt="">
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
        newCard.className = "col-span-3 flex justify-center items-center p-36"
        newCard.innerHTML = `<img src="./icons/Icon.png" alt="">`;
        cardsContainer.appendChild(newCard);
    }

    const sortedData = [...data.data];

    (sortedData).sort((a, b) => {
        const elementA = parseFloat(a.others.views);
        const elementB = parseFloat(b.others.views);
        return elementB - elementA;
    })

    document.getElementById("sort-by-views").addEventListener('click', );
    
    console.log(sortedData);
};

async function appendBySortedData(){
    cardsContainer.innerHTML = ``;
    sortedData.forEach(sortedElement => {
        const newCard = document.createElement("div");
        newCard.className = "card bg-white shadow-xl p-2 w-80 h-full";
        newCard.innerHTML = `
            <figure class="h-48"><img src="${sortedElement.thumbnail}" alt="" class="w-full h-full" /></figure>
            <div class="card-body px-0">
                <div class="flex justify-start items-start gap-3">
                    <figure class="h-12 w-12"><img src="${sortedElement.authors[0]?.profile_picture}" alt="" class="h-12 w-12 rounded-[50%]" /></figure>
                    <div>
                        <h2 class="card-title font-bold text-base">${sortedElement.title}</h2>
                        <div class="flex justify-start items-center gap-2">
                            <span class="font-normal text-sm text-[#171717B2]">${sortedElement.authors[0]?.profile_name}</span> <img
                                src="./icons/fi_10629607.png" alt="">
                        </div>
                        <span class="font-normal text-sm text-[#171717B2]">${sortedElement.others?.views}</span>
                    </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(newCard);
    });
}

