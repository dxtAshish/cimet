const addButton = document.querySelector(".addbtn");
const box = document.querySelector(".box");
const modal = document.querySelector(".modal");
const cancel = document.querySelector("#cancel");
const add = document.querySelector("#add");
const closeModal=document.querySelector(".close")
const color = ["#3cb371", "#ee82ee", "#6a5acd", "pink", "#ff6347"];
const arr = [];

addButton.addEventListener('click', () => {
    modal.style.display = "flex";
});

cancel.addEventListener('click', () => {
    modal.style.display = "none";
});
closeModal.addEventListener('click',()=>{
    modal.style.display="none"
    console.log("caaal")
})

add.addEventListener('click', () => {
    const avatarName = document.querySelector("input").value;
    if (avatarName.length > 0) {
        const avatar = document.createElement('div');
        avatar.classList.add("btn", "avatar");
        avatar.innerHTML = `<h1>${avatarName[0]}</h1>`;
        const index = Math.floor(Math.random() * color.length);
        avatar.style.backgroundColor = color[index];

        const cross = document.createElement('div');
        cross.classList.add("cross");
        cross.innerHTML = '<p>x</p>';
        avatar.appendChild(cross);
        
        arr.push(avatar);

        cross.addEventListener('click', () => {
            box.removeChild(avatar);
        });

        box.insertBefore(avatar, addButton);
        modal.style.display = "none";

        
        document.querySelector("input").value = "";
    } else {
        console.log("Avatar name is empty");
    }
});
