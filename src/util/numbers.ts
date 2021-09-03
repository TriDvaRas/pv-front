export function floorPow2(a: number) {
    if (a >= 16)
        return 16
    if (a >= 8)
        return 8
    if (a >= 4)
        return 4
    if (a >= 2)
        return 2
    return 0
}