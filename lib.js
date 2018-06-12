var byId       = id          => document.getElementById(id)
var show       = id          => byId(id).classList.remove("hidden")
var hide       = id          => byId(id).classList.add("hidden")
var repeat     = (x, n)      => new Array(n + 1).join("x")
