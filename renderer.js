document.addEventListener("DOMContentLoaded", () => {
    // formの[code generate]時の動作を定義する
    document.getElementById("generate-form").onsubmit = () => {
        
        document.getElementById("generated-code").value = "";

        // テンプレートを入力するinputを取得する
        const templateInput = document.getElementById("template-input");
        
        if (templateInput.value.trim() === "") {
            // テンプレートが入力されていない場合は何もしない
            document.getElementById("generated-code").value = "テンプレートを入力してください。";
            return false;
        }

        var templete_text = templateInput.value;
        var elem_nums = [1,2,3];
        var num_texts_hash = [];

        // 要素番号ごとに、各テキストエリアの内容を配列で持つ
        elem_nums.forEach(function(elem_num){
            if(check_sub(templete_text, elem_num)) {
                const elem_texts = document.getElementById(`element-${elem_num}`).value.split(/\r\n|\r|\n/);
                num_texts_hash[`${elem_num}`] = elem_texts;
            }
        });

        // 要素の数を取得する
        var elem_size;
        for (elem_num in num_texts_hash) {
            if(elem_size) {
                if (num_texts_hash[elem_num].length != elem_size) {
                    document.getElementById("generated-code").value = "要素の数を揃えてください。";
                    return false;
                }
            } else {
                elem_size = num_texts_hash[elem_num].length;
            }
        }

        // 要素数分のテンプレートをhashにセットする（要素indexごと）
        var index_text_hash = [];
        Array.from({length: elem_size}, (v, k) => k).forEach(function(wk_index){
            index_text_hash[wk_index] = templete_text;
        });

        // 要素1、2、…ごとに<Subxx>を置換していく
        for (elem_num in num_texts_hash) {
           var index = 0; // 要素番号ごとにindexをカウントする
            num_texts_hash[elem_num].forEach(function(text){
                // <Subxx>を要素に置換する
                index_text_hash[index] = index_text_hash[index].split(`<Sub${elem_num}>`).join(text);
                index ++;
            });
        }

        // 配列を改行で連結して出力用文字列にセット
        const generated_text = index_text_hash.join("\n");

        document.getElementById("generated-code").value = generated_text;

        return false;
    }
});

// Sub#{number}が含まれているかチェック
function check_sub(text, element_num) {
    return text.indexOf(`Sub${element_num}`) != -1;
}
