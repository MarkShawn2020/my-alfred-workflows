import {exec} from "child_process"
import {TransMeta} from "./ds";
import {AlfredResult} from "../../alfred";

function checkLang(text: string): TransMeta {
    const zhCharsCnt = text.match(/[\u4e00-\u9fff]/)?.length || 0
    const enCharsCnt = text.match(/[a-zA-Z]/)?.length || 0
    const fromLang = zhCharsCnt > enCharsCnt ? "ZH" : "EN"
    const toLang = zhCharsCnt > enCharsCnt ? "EN" : "ZH"
    return {
        text,
        fromLang,
        targetLang: toLang
    }
}


async function translateViaDeepL(s: string) {

    const transMeta = checkLang(s)
    const commandTransViaDeepL = `cd /Users/mark/coding/PycharmProjects/datamine-playground;
        venv/bin/python project_deepl/src/main.py "${s}" -f plain \
        --from_lang ${transMeta.fromLang} --target_lang ${transMeta.targetLang} \
        --terminology "/Users/mark/coding/PycharmProjects/datamine-playground/project_deepl/config/terminology.txt"`

    return new Promise(((resolve, reject) => {
        exec(commandTransViaDeepL, (error, stdout, stderr) => {
            if (error || stderr) {
                // if (error) console.error({error})
                if (stderr) console.error({stderr})
                return reject("ABORT");
            }
            const result: AlfredResult = {
                items: [
                    {
                        title: stdout,
                        icon: {
                            path: "logo_deepl.png"
                        }
                    },
                ]
            }
            console.log(JSON.stringify(result))
            return resolve(result)
        })
    }))
}


translateViaDeepL(process.argv[2]).catch(() => {
})
