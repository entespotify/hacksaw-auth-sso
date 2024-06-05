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
export function join(...paths: string[]) : string {
    let joinedPath: string = '';
    paths.map(path => {
        joinedPath = path.startsWith('/') || joinedPath.endsWith('/') ? joinedPath + path : joinedPath + '/' + path;
    })
    return joinedPath;
}
