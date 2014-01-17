$(function(){
    var modalRequestInvite={}
    var inviteIdentifier={}

    function createTagsInput(){
        $('#preferredLocations').tagsInput({
            defaultText:'Add a preferred location e.g. HSR, BTM',
            'unique':true,
            width:'300px',
            placeholderColor:'#999999',
            autocomplete_url:["HSR Layout","Bellandur","Sarjapur Road","Koramangala","Domlur","Old Airport Road","Marathahalli","Brookefields","Whitefield","Old Madras Road","Rammurthy Nagar","Jeevan Bhima Nagar","Indiranagar","BTM","MG Road","Brigade Road","Residency Road","Richmond Road","Richmond Town","Infantry Road","Cunningham Road","Lavelle Road","JP Nagar","Jayanagar","Bannerghatta","Electronic City","KR Puram","Banashankari","Banaswadi","BasavanagudiBasaveshwara NagarFrazer Town","HBR Layout","Hebbal","International AirportJakkur","Kalyan Nagar","KammanahalliKumaraswamy Layout","Magadi Road","MajesticMalleshwaram","Mysore Road","Nagawara","New BEL Road","Peenya","RT Nagar","Race Course Road","Rajajinagar","Rajarajeshwari Nagar","Sadashiv Nagar","Sahakara Nagar","Sanjay Nagar","Sankey Road","Seshadripuram","Shanti Nagar","Shivajinagar","Ulsoor","Vijay Nagar","Yelahanka","Yeshwantpur" ]
        });
    }
    function activateRequestInvite(){

        $('.rq_invite_link_bottom').click(function(){
            if($("#rq_invite_link_top_form input").val()==""){
                return;
            }
            var data=$('#rq_invite_link_bottom_form').serialize()
            submitInvite(data);
            return false;
        })
    }
    function activateSubmitLocation(){

        $('.rq_submit').click(function(){
            var data=$('#requestInviteUpdateForm').serialize()
            submitLocation(data);
            return false;
        })
    }

    function showShareModal(){
        if(modalRequestInvite.close){
            modalRequestInvite.close();
        }
        $("#modal_share").modal({
            zIndex:4200  ,
            maxHeight:'140px'
        });
    }

    function activateSkipStep(){
        $('.skip').click(function(index){
            showShareModal();
        })

    }

    function submitInvite(data){
        clearStatus();
        submitForm(data)

    }
    function clearStatus(){
        $('#success').html("")
        $('#error').html("")
        $('#success').hide()
        $('#error').hide()

    }
    function submitForm(data){
        clearStatus()
        var request=$.ajax({
            url:"http://beta.app.vgulp.com/userRegistration/requestInvite",
            type:'POST',
            data:data,
            dataType:'json'
        })
        request.fail(function(data,jqxr){
            $('#error').html("Unable to request for invite. If you provided your email we don&apos;t really know what the heck happened for now. Please try again.")
            $('#error').show();
        })
        request.done(function(data,jqxr){
            $('#success').html("")
            $('#success').show();
            inviteIdentifier.id=data.id ;
            modalRequestInvite=$("#modal_request_invite").modal({
                zIndex:4200,
                minHeight:332,
                minWidth:320,
                maxWidth:320
            });
            createTagsInput();
        })
    }
    function submitLocation(dataInForm){
        clearStatus()
        var request=$.ajax({
            url:"http://beta.app.vgulp.com/requestInvite/update/"+inviteIdentifier.id,
            type:'POST',
            data:dataInForm,
            dataType:'json'
        })
        request.fail(function(data,jqxr){
            $('#error').html("Heck.Unable to update your preference. Please try again.")
            $('#error').show();
        })
        request.done(function(data,jqxr){
            $('#success').html("We are gonna fine tune your searches for sure. Happy Gulping till then!")
            $('#success').show();
            showShareModal();
        })
    }
    //
    function initRequestInvite(){
        activateRequestInvite();
        activateSkipStep();
        activateSubmitLocation();
    }
    initRequestInvite();
})