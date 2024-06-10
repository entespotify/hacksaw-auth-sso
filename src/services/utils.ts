/**
 * Force logout user.
 * Removes the auth token from local storage and reloads the page to redirect user to login page.
 * To-do: Switch to redux way of doing this operation and remove the method.
 */
export function forceLogOut() {
    try {
        localStorage.removeItem("token");
        window.location.reload();
    } catch (error) {
        console.error("Error occurred while logging out user.", error);
    }
}

/**
 * Joins the paths given, works similar to paths.join
 * @param paths comma seperated array of paths
 * @returns paths joined with '/'
 */
export function join(...paths: string[]): string {
    let joinedPath: string = '';
    paths.map(path => {
        joinedPath = path.startsWith('/') || joinedPath.endsWith('/') ? joinedPath + path : joinedPath + '/' + path;
    })
    return joinedPath;
}

/**
 * Converts bytes to higher order units
 * @param bytes value in bytes
 * @param decimals limiting to decimal position
 * @returns converted bytes to higher units
 */
export function formatBytes(bytes: number, decimals = 2): string {
    try {
        if (!+bytes) return ''
        const reference = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        const i = Math.floor(Math.log(bytes) / Math.log(reference))
        return `${parseFloat((bytes / Math.pow(reference, i)).toFixed(dm))} ${sizes[i]}`
    } catch (error: Error | any) {
        console.error("Error occurred while coverting bytes to higher order:", error.message)
    }
    return '';
}

/**
 * Coverts a UTC date to fromatted date
 * @param dateString UTC date string
 * @returns formatted date
 */
export function formatDate(dateString: string): string {
    let date: string = "";
    try {
        let dateObj = new Date(dateString);
        date = dateObj.toLocaleString("en-US", {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        });
    } catch (error: Error | any) {
        console.log("Error occurred while formatting date string:", error.message);
    }
    return date;
}
