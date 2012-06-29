beforeEach(function() {
  this.addMatchers({
    toDeriveFrom: function(expected) {
      return this.actual instanceof expected;
    }
  });
});

describe('giddler',function(){

  it('returns Gist if location is gist', function(){
    var location = "https://gist.github.com/606699/";
    expect(giddler(location)).toDeriveFrom(Gist);
  });

  it('returns Repo if location is repo', function(){
    var location = "https://github.com/jasonkarns/";
    expect(giddler(location)).toDeriveFrom(Repo);
  });

});

describe('Gist', function(){
  describe('#sounds_like_a_fiddle - true', function(){

    beforeEach(function(){
      affix("#files .file#file_fiddle");
    });

    it('returns true if fiddle.css is found', function(){
      //affix("#files .file#file_fiddle\\.css");
      expect(new Gist().sounds_like_a_fiddle()).toBeTruthy();
    });

    it('returns true if fiddle.html is found', function(){
      //affix("#files .file#file_fiddle\\.html");
      expect(new Gist().sounds_like_a_fiddle()).toBeTruthy();
    });

    it('returns true if fiddle.js is found', function(){
      //affix("#files .file#file_fiddle\\.js");
      expect(new Gist().sounds_like_a_fiddle()).toBeTruthy();
    });

    it('returns true if fiddle.manifest is found', function(){
      //affix("#files .file#file_fiddle\\.manifest");
      expect(new Gist().sounds_like_a_fiddle()).toBeTruthy();
    });

  });

  describe('#sounds_like_a_fiddle - false', function(){

    it('returns false if fiddle.(html|css|js|manifest) is not found', function(){
      expect(new Gist().sounds_like_a_fiddle()).toBeFalsy();
    });

    it('returns false if fiddle.fake is not found', function(){
      //affix("#files .file#file_fiddle\\.fake");
      expect(new Gist().sounds_like_a_fiddle()).toBeFalsy();
    });

  });

});
