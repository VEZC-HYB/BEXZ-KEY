function checkInput() {
    let code = document.getElementById('inputCode').value;
    let clearBtn = document.getElementById('clearBtn');
    
    if (code.trim().length > 0) {
        clearBtn.classList.remove('text-slate-400');
        clearBtn.classList.add('text-red-500', 'hover:text-red-400');
    } else {
        clearBtn.classList.remove('text-red-500', 'hover:text-red-400');
        clearBtn.classList.add('text-slate-400');
    }
}

function clearCode() {
    document.getElementById('inputCode').value = '';
    let clearBtn = document.getElementById('clearBtn');
    clearBtn.classList.remove('text-red-500', 'hover:text-red-400');
    clearBtn.classList.add('text-slate-400');
}

function obfuscateCode() {
    let code = document.getElementById('inputCode').value;
    
    if (!code.trim()) {
        return;
    }

    let encodedCode = btoa(unescape(encodeURIComponent(code)));

    let result = `-- ZOVE SCRIPT LUA PROTECT\n` +
                 `-- https://discord.gg/fcKnCrbhq\n\n` +
                 `local _zove_data = "${encodedCode}"\n` +
                 `local function _zove_decode(data)\n` +
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
                 `end\n\n` +
                 `pcall(function()\n` +
                 `    local realCode = _zove_decode(_zove_data)\n` +
                 `    loadstring(realCode)()\n` +
                 `end)`;

    document.getElementById('outputCode').value = result;
}

function copyOutput() {
    let output = document.getElementById('outputCode');
    if (!output.value) return;
    output.select();
    navigator.clipboard.writeText(output.value);
}
