function byId(str) {
    return document.getElementById(str);
}

function byClass(str) {
    return document.getElementsByClassName(str);
}

function findPath() {
    var pathname = window.location.pathname;
    return pathname.substr(pathname.lastIndexOf("\/") + 1);
}

function findId() {
    var path = findPath();
    var match = path.match(/_(.*)\.htm/);
    if (match && match[1]) {
        return match[1];
    }
    return "";
}

function findLink(node) {
	if (!node) {
		return null;
	}
    var link = node.querySelector("L").innerHTML;
    if (link) {
        return "." + link;
    } else {
        return null;
    }
}

var url = XML_FILE;
xmlHttp = new XMLHttpRequest();
xmlHttp.open("get", url, true);
xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4) {
        var nodes = xmlHttp.responseXML.firstElementChild.firstElementChild;
        var id = findId();
        var ids = nodes.querySelectorAll("ID");
        for (var i = ids.length - 1; i >= 0; i--) {
            var ele = ids[i];
            if (ele.innerHTML == id) {
                var prevUrl = findLink(ele.parentNode.previousElementSibling);
                var nextUrl = findLink(ele.parentNode.nextElementSibling);

                // Show page control
                if (prevUrl) {
                    var prevLink = byId("PreElementLink");
                    prevLink.style["display"] = "";
                    prevLink.href = prevUrl;
                }
                if (nextUrl) {
                    var nextLink = byId("NextElementLink");
                    nextLink.style["display"] = "";
                    nextLink.href = nextUrl;
                }

                // Add keyboard control
                document.addEventListener("keydown", function(event) {
                    if (event.keyCode == 37 && prevUrl) {
                        window.location = prevUrl;
                    } else if (event.keyCode == 39 && nextUrl) {
                        window.location = nextUrl;
                    }
                }, false);
                return;
            }
        }
    }
};
xmlHttp.send();