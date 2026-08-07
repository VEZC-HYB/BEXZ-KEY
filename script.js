function obfuscateCode() {
    let code = document.getElementById('inputCode').value;
    
    if (!code.trim()) {
        return;
    }

    let encodedCode = btoa(unescape(encodeURIComponent(code)));

    let result = `-- ZOVE SCRIPT LUA PROTECT\n` +
                 `-- https://discord.gg/fcKnCrbhq\n\n` +
                 `local encoded = "${encodedCode}"\n` +
                 `local decoded = syn and syn.crypt and syn.crypt.base64.decode(encoded) or (base64 and base64.decode(encoded)) or (crypt and crypt.base64decode(encoded)) or (function(data)\n` +
                 `    local b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'\n` +
                 `    data = string.gsub(data, '[^'..b..'=]', '')\n` +
                 `    return (data:gsub('.', function(x)\n` +
                 `        if (x == '=') then return '' end\n` +
                 `        local r,f='',(b:find(x)-1)\n` +
                 `        for i=6,1,-1 do r=r..(f%2^i-f%2^(i-1)>0 and '1' or '0') end\n` +
                 `        return r;\n` +
                 `    end):gsub('%d%d%d?%d?%d?%d?%d?%d?', function(x)\n` +
                 `        if (#x ~= 8) then return '' end\n` +
                 `        local c=0\n` +
                 `        for i=1,8 do c=c+(x:sub(i,i)=='1' and 2^(8-i) or 0) end\n` +
                 `        return string.char(c)\n` +
                 `    end))\n` +
                 `end)(encoded)\n\n` +
                 `local success, err = pcall(function()\n` +
                 `    loadstring(decoded)()\n` +
                 `end)\n` +
                 `if not success then\n` +
                 `    warn("[ZOVE PROTECT] Error: " .. tostring(err))\n` +
                 `end`;

    document.getElementById('outputCode').value = result;
}
