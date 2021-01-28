var frm = document.querySelector("[name=memberEnrollFrm]");

frm.onsubmit = function(){
    //1. id 검사
    //문자열 길이 length는 속성. 메소드가 아님.
    if(join_id.value.length < 4){
        alert("아이디는 4글자 이상이어야 합니다.");
        join_id.select();
        return false;
    }

    //2. 이름 검사
    if(/^[가-힣]{2,}$/.test(join_name.value)==false){
        alert("이름은 한글 2글자 이상이어야 합니다.");
        join_name.select();
        return false;
    }

    //3. 비밀번호 검사 : 4글자 이상 && (pwd.value == pwdCheck.value)
    if(join_password.value.length < 4){
        alert("비밀번호는 4글자 이상이어야 합니다.");
        join_password.select();
        return false;
    }

    if(join_password.value != join_passwordchk.value){
        alert("비밀번호가 일치하지 않습니다.");
        join_password.value = '';   
        join_passwordchk.value = '';
        join_password.focus();
        return false;
    }
    return true;
}

function test(){
    alert('hi');
}

function Member(id, password, name){
    this.id = id;
    this.password = password;
    this.name = name;
    // 날짜는 유닉스초로 관리(관리의 용이성을 위해)
    this.time = new Date().getTime();
}

join_passwordchk.onblur=function(){
    if(join_password.value != join_passwordchk.value){
        alert('비밀번호가 일치하지 않습니다');
        join_password.value='';
        join_passwordchk.value='';
        join_password.focus();
    }
};

function saveMember(){
    console.log('hi');
    var member = new Member($(join_id).val(), $(join_password).val(), $(join_name).val());
    console.log(member);

    //기존데이터 가져오기. 존재하지 않을때만 새 배열 생성
    var arr = JSON.parse(localStorage.getItem("arr"));
    if(arr == null) arr = [];
    arr.push(member);
    console.log(arr);

    //배열로 저장
    var jsonStr = JSON.stringify(arr);
    localStorage.setItem("arr",jsonStr);

    //초기화
    $(join_id).val('').focus();
    $(join_password).val('');
    $(join_passwordchk).val('');
    $(join_name).val('');
    alert('회원가입을 완료하였습니다.');
    //새로 입력된 정보로 갱신
    loadMember();
};

function loadMember(){
    var arr = JSON.parse(localStorage.getItem("arr"));
    var $member_table = $(member_table);

    //헤더부분 추가
    $member_table.html("<tr><th>No  </th><th>아이디</th><th>이름  </th><th>가입일시</th></tr>");

    //내용부분 추가
    if(arr == null){
        $member_table.append("<tr><td colspan='3'회원이 없습니다.</td></tr>");
    }else{
        arr.reverse(); //방명록 내림차순

        $.each(arr, function(index, elem){
            var date = new Date(elem.time);
            // unix second -> date 객체로 변환
            var tr = "<tr>";
            tr += "<td>" + (index + 1) + "</td>";
            tr += "<td>" + elem.id + "</td>";
            tr += "<td>" + elem.password /* .replaceAll("\n","<br>") */ + "</td>";
            tr += "<td>" + displayTime(date) + "</td>";
            tr += "</tr>";
            $member_table.append(tr);
        });
    }

    /**
     * 2021/01/28 11:50
     */ 
    function displayTime(date){
        return date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate()
        + " " + date.getHours() + ":" + date.getMinutes();
    }
}

$(document).ready(function(){
    loadMember();
    var source = "SellBuyMusic_confidence.mp3"
    var audio = document.createElement("audio");
    //
    audio.autoplay = true;
    //
    audio.load()
    audio.addEventListener("load", function() { 
        audio.play(); 
    }, true);
    audio.src = source;
});