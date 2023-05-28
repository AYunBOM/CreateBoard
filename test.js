function check(){
    //form 의 요소를 가지고 올 때에는 form의 이름을 사용하여 가져와야 한다. getElementById는 안댕
    var title = document.create.title;
    var name = document.create.name;
    var text = document.create.text;
            
    if(title.value==""){
        alert("제목을 입력해주세요.");
        title.focus();
        return false;
    }else if(name.value==""){
        alert("이름을 입력해주세요.");
        name.focus();
        return false;
    }else if(text.value==""){
        alert("내용을 입력해주세요.");
        text.focus();
        return false;
    }else{
        alert("글이 등록됩니다!");
        return true;
    }
}