/*
    Copyright (C) 2026 Anonymous
    
    This software may be modified and distributed under the terms
    of the MIT license.  See the LICENSE file for details.
*/

(async function () {
    try {
        if (!is_jailbroken()) {
            fail("elfldr is not running!");
        }

        const payload_name = "ps5_autoload.elf";
        let payload_path = null;

        const title_id = resolve_title_id();

        for (const slot of ["000", "001", "002"]) {
            const p = "/mnt/sandbox/" + title_id + "_" + slot + "/download0/cache/splash_screen/aHR0cHM6Ly93d3cueW91dHViZS5jb20vdHY=/" + payload_name;
            if (file_exists(p)) { payload_path = p; break; }
        }

        if (!payload_path) {
            fail("\"" + payload_name + "\" not found!");
        }

        const file_data = await read_file(payload_path);
        if (!file_data) {
            fail("Failed to read \"" + payload_name + "\"");
        }

        await send_network("127.0.0.1", 9021, SOCK_STREAM, file_data);
        await ulog("\"" + payload_name + "\" sent to elfldr successfully");
    } catch (e) {
        try { await log("autoloader FATAL: " + e.message); } catch (_) { }
        try { send_notification("autoloader FAILED: " + e.message); } catch (_) { }
    }
})();