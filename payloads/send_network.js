(async function () {
    try {
        check_jailbroken();

        const payload_name = "ps5_autoload.elf";
        // const payload_path = "/mnt/sandbox/download/PPSA01650/cache/splash_screen/aHR0cHM6Ly93d3cueW91dHViZS5jb20vdHY=/ps5_autoload.elf";
        // const payload_path = "/download0/cache/splash_screen/aHR0cHM6Ly93d3cueW91dHViZS5jb20vdHY=/ps5_autoload.elf";
        const payload_path = find_file(payload_name);

        if (!payload_path) {
            throw new Error("\"" + payload_name + "\" not found!");
        }

        const file_data = await read_file(payload_path);
        if (!file_data) {
            throw new Error("Failed to read \"" + payload_name + "\"");
        }

        await send_network("127.0.0.1", 9021, SOCK_STREAM, file_data);
        await log("\"" + payload_name + "\" sent to elfldr successfully");
    } catch (e) {
        const msg = (e && e.message) ? e.message : String(e);
        await log("Error: " + msg);
        throw e;
    }
  })();