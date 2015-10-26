var currentPID = 0;


chrome.tabs.onHighlighted.addListener(function (highlightInfo){
	chrome.processes.getProcessIdForTab(highlightInfo.tabIds[0], function (pid) {
		currentPID = pid;
	});
})


chrome.processes.onUpdatedWithMemory.addListener(function (procs){
	if (currentPID > 0){
		var text = formatMemoryForBadge(procs[currentPID].privateMemory);
		setExtensionBadge(text);
	}
})


function formatMemoryForBadge(memory){
	memory = (memory / Math.pow(1024, 3)).toFixed(1);
	memory = String(memory) + "G";
	return memory;
}


function setExtensionBadge(text){
	chrome.browserAction.setBadgeText({ text: text });
}

