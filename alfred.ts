type AlfredItemIconType =
    "fileicon" | // 文件的icon类型
    "filetype" // UTI format，可以不考虑

interface AlfredItemIcon {
    // 参考：https://www.alfredforum.com/topic/8977-can-i-use-icons-from-the-web-in-alfred-3/?do=findComment&comment=44613
    type?: AlfredItemIconType // 缺失表示文件本身的内容
    path: string
}

enum AlfredItemType {
    default = "default",
    file = "file",
    fileSkipCheck = "file:skipcheck"
}

interface AlfredItemMod {
    valid: boolean
    arg: string
    subtitle: string
    icon: string
    variables: string[]
}

interface AlfredItemMods {
    alt: AlfredItemMod
    cmd: AlfredItemMod
}

interface AlfredItem {

    uid?: string  // 排序用的id，如果为空，则以默认列表顺序
    title: string  // 显示的大标题（第一行）
    subtitle?: string  // 显示的副标题（第二行）
    arg?: string | string[]  // 参数
    icon?: AlfredItemIcon
    valid?: boolean  // 缺失或者为true会使item拥有按下return(enter)后的交互特性
    match?: string  // todo
    autocomplete?: string  // 当用户按下tab键后的自动填充
    type?: AlfredItemType
    mods?: AlfredItemMods
    action?: object | string[] | string
    text?: object
    quicklookurl?: string  // quick look 特性，当用户按下shift键后，一般传入一个网址或者文件地址
}

interface AlfredResult {

    items: AlfredItem[]
}


export {
    AlfredResult,
    AlfredItem
}