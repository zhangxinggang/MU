import "./readme.less";

function getAllMds() {
    const mdFiles = require.context("./", true, /.md$/);
    const messages = {};
    mdFiles.keys().forEach((one) => {
        let matched = one.match(/([A-Za-z0-9-_]+)\./i);
        let key = matched[1];
        messages[key] = mdFiles(one);
    });
    return messages;
}
const mds = getAllMds();
let liHtml = "";
for (let key in mds) {
    liHtml += `<li style="margin-right:16px;font-size:16px;cursor:pointer;color:#6161e9;" name="${key}">${key}</li>`;
}
const html = `
    <div style="font-size:18px;">Note</div>
    <ul id="mdlabel" style="list-style:none;display:flex;flex-wrap:wrap">
        ${liHtml}
    </ul>
    <div id="mdcontent"></div>
`;
document.getElementById("app").innerHTML = html;
let mdlabel = document.getElementById("mdlabel");
mdlabel.onclick = function (ev) {
    ev = ev || window.event;
    let li = ev.srcElement || ev.target;
    let name = li.getAttribute("name");
    if (name) {
        document.getElementById("mdcontent").innerHTML = mds[name].default;
    }
};
