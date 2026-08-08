document.getElementById('obfuscateBtn').addEventListener('click', function() {
    const rawInput = document.getElementById('inputScript').value;
    const outputArea = document.getElementById('outputScript');

    if (!rawInput.trim()) {
        alert('Your script is empty, bro!');
        return;
    }

    try {
        // Basic obfuscation logic converting string to safe byte array and loadstring wrapper
        const obfuscated = simpleLuaObfuscate(rawInput);
        outputArea.value = obfuscated;
    } catch (err) {
        alert('Failed to obfuscate script: ' + err.message);
    }
});

// Encoder function safe for executor Lua loadstring environment
function simpleLuaObfuscate(code) {
    const bytes = [];
    for (let i = 0; i < code.length; i++) {
        bytes.push(code.charCodeAt(i));
    }

    const encodedData = bytes.join(',');

    const wrapper = 
`-- Obfuscated using Custom Web Luaobsu
local _u = {${encodedData}}
local _s = ""
for i = 1, #_u do
    _s = _s .. string.char(_u[i])
end
local success, result = pcall(function()
    return loadstring(_s)()
end)
if not success then
    warn("Obfuscated Error: " .. tostring(result))
end`;

    return wrapper;
}
