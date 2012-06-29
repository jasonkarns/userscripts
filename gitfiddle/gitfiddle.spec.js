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
  describe('#insert_fiddle_link', function(){
    it('inserts fiddle link', function(){
      var meta = affix('#repos .meta table tbody');
      new Gist({ pathname : '/606699/' }).insert_fiddle_link();
      expect($(meta)).toContain('tr td.label');
      expect($(meta)).toContain('tr td a.gist-fiddle-link');
    });
  });
});

describe('LinksGist', function(){
  describe('#url', function(){
    it('is built from the gist id', function(){
      var location = { pathname : '/606699/' };
      var fiddle_url = 'http://jsfiddle.net/gh/gist/mootools/1.2/606699/';
      expect(new LinksGist(location).url).toBe(fiddle_url);
    });
    it('handles sha hash', function(){
      var location = { pathname : '/606699/35b6e9d1037cb33da0943ceccf5ddde6bd362263/' };
      var fiddle_url = 'http://jsfiddle.net/gh/gist/mootools/1.2/606699/';
      expect(new LinksGist(location).url).toBe(fiddle_url);
    });
  });
  describe('#link', function(){
    var location = { pathname : '/606699/35b6e9d1037cb33da0943ceccf5ddde6bd362263/' };
    var fiddle_url = 'http://jsfiddle.net/gh/gist/mootools/1.2/606699/';
    it('builds the link', function(){
      var subject = new LinksGist(location).link;
      //expect($(subject)).toBe('td a.gist-fiddle-link');
    });
    it('sets the href', function(){
      var subject = new LinksGist(location).link;
      //expect($(subject)).toHaveAttr('href', fiddle_url);
    });
    it('sets the text content', function(){
      var subject = new LinksGist(location).link;
      expect($(subject)).toHaveText(fiddle_url);
    });
  });
  describe('#label', function(){
    it('builds the label', function(){
      //var subject = new LinksGist(location).label;
      //expect($(subject)).toBe('td.label');
    });
  });
});