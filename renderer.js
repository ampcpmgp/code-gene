document.addEventListener("DOMContentLoaded", () => {
    // formのsubmit時の動作を定義する
    document.getElementById("comment-form").onsubmit = () => {
        
        document.getElementById("generated-code").value = "";

        // コメントを入力するinputを取得する
        const commentInput = document.getElementById("comment-input");
        
        if (commentInput.value.trim() === "") {
            // コメントが入力されていない場合は何もしない
            return false;
        }

        var templete_text = commentInput.value;
        var elem_nums = [1,2,3];
        var num_texts_hash = [];

        // 要素番号ごとに、各テキストエリアの内容を配列で持つ
        elem_nums.forEach(function(elem_num){
            if(check_sub(templete_text, elem_num)) {
                const elem_texts = document.getElementById(`element-${elem_num}`).value.split(/\r\n|\r|\n/);
                num_texts_hash[`${elem_num}`] = elem_texts;
            }
        });

        var elem_max;
        for (elem_num in num_texts_hash) {
            if(elem_max) {
                if (num_texts_hash[elem_num].length != elem_max) {
                    return false;
                }
            } else {
                elem_max = num_texts_hash[elem_num].length;
            }
        }

        var index_text_hash = [];

        Array.from({length: elem_max}, (v, k) => k).forEach(function(wk_index){
            index_text_hash[wk_index] = templete_text;
        });

        var generated_text = "";

        for (elem_num in num_texts_hash) {
           var index = 0;
            num_texts_hash[elem_num].forEach(function(text){
                index_text_hash[index] = index_text_hash[index].replace(`<Sub${elem_num}>`, text);
                index ++;
            });
        }

        for (wk_index in index_text_hash) {
            generated_text += index_text_hash[wk_index] + "\n";
        }

        document.getElementById("generated-code").value = generated_text;

        return false;
    }
});

// Sub#{number}が含まれているかチェック
function check_sub(text, element_num) {
    return text.indexOf(`Sub${element_num}`) != -1;
}
