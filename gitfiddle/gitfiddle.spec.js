describe('GitFiddle',function(){
  var subject;

  context('when location is a gist', function(){
    var location = {host: "gist.github.com"};

    it('creates a Gist link', function(){
      spyOn(GitFiddle, 'Gist').andCallThrough();
      spyOn(GitFiddle, 'Repo');

      GitFiddle(location);
      expect(GitFiddle.Gist).toHaveBeenCalled();
      expect(GitFiddle.Repo).not.toHaveBeenCalled();
    });

    context('when gist sounds like a fiddle', function(){
      it('calls insert_link', function(){
        spyOn(GitFiddle.Gist.prototype, 'sounds_like_a_fiddle').andReturn(true);
        spyOn(GitFiddle.Gist.prototype, 'insert_link');

        GitFiddle(location);
        expect(GitFiddle.Gist.prototype.insert_link).toHaveBeenCalled();
      });
    });

    context('when gist does not sound like a fiddle', function(){
      it('should not call insert_link', function(){
        spyOn(GitFiddle.Gist.prototype, 'sounds_like_a_fiddle').andReturn(false);
        spyOn(GitFiddle.Gist.prototype, 'insert_link');

        GitFiddle(location);
        expect(GitFiddle.Gist.prototype.insert_link).not.toHaveBeenCalled();
      });
    });
  });
  context('when location is a repo', function(){
    it('creates a Repo link', function(){
      var location = {host: "github.com"};
      spyOn(GitFiddle, 'Gist');
      spyOn(GitFiddle, 'Repo');

      GitFiddle(location);
      expect(GitFiddle.Repo).toHaveBeenCalled();
      expect(GitFiddle.Gist).not.toHaveBeenCalled();
    });
  });
});

describe('Gist', function(){
  describe('#sounds_like_a_fiddle', function(){
    var affix_file = function(id){
      affix('#files .file').find('.file').attr('id', id);
    };
    var sounds_like_a_fiddle = function(){
      return new GitFiddle.Gist().sounds_like_a_fiddle();
    };

    context('is true when', function(){
      it('fiddle.css is found', function(){
        affix_file('file_fiddle.css');
        expect(sounds_like_a_fiddle()).toBeTruthy();
      });
      it('fiddle.html is found', function(){
        affix_file('file_fiddle.html');
        expect(sounds_like_a_fiddle()).toBeTruthy();
      });
      it('fiddle.js is found', function(){
        affix_file('file_fiddle.js');
        expect(sounds_like_a_fiddle()).toBeTruthy();
      });
      it('fiddle.manifest is found', function(){
        affix_file('file_fiddle.manifest');
        expect(sounds_like_a_fiddle()).toBeTruthy();
      });
    });

    context('is false when', function(){
      it('fiddle.(html|css|js|manifest) is not found', function(){
        expect(sounds_like_a_fiddle()).toBeFalsy();
      });
      it('if fiddle.fake is found', function(){
        affix_file('file_fiddle.fake');
        expect(sounds_like_a_fiddle()).toBeFalsy();
      });
      it('if fiddle is found', function(){
        affix_file('file_fiddle');
        expect(sounds_like_a_fiddle()).toBeFalsy();
      });
    });
  });

  describe('#id', function(){
    it('parses the gist id from the location', function(){
      expect(new GitFiddle.Gist({ pathname : '/606699/' }).id).toBe('606699');
    });
    it('handles sha hash', function(){
      var location = { pathname : '/606699/35b6e9d1037cb33da0943ceccf5ddde6bd362263/' };
      expect(new GitFiddle.Gist(location).id).toBe('606699');
    });
  });
  describe('#insert_link', function(){
    it('inserts link', function(){
      var meta = affix('#repos .meta table tbody');

      var gist_linker = jasmine.createSpyObj('LinksGist', ['build']);
      gist_linker.build.andReturn($('<tr class="test">')[0]);
      spyOn(GitFiddle,'LinksGist').andReturn(gist_linker);

      new GitFiddle.Gist({ pathname : '/606699/' }).insert_link();

      expect(GitFiddle.LinksGist).toHaveBeenCalledWith('606699');
      expect(gist_linker.build).toHaveBeenCalled();
      expect($(meta)).toContain('tr.test');
    });
  });
});

describe('LinksGist', function(){
  var gist = {id: '606699'};
  var fiddle_url = 'http://jsfiddle.net/gh/gist/mootools/1.2/606699/';

  describe('#url', function(){
    it('is built from the gist id', function(){
      expect(new GitFiddle.LinksGist(gist).url).toBe(fiddle_url);
    });
  });

  describe('#link', function(){
    it('is an anchor', function(){
      var subject = new GitFiddle.LinksGist(gist).link;
      expect($(subject)).toBe('a.gist-fiddle-link');
    });
    it('has the correct href', function(){
      var subject = new GitFiddle.LinksGist(gist).link;
      expect($(subject)).toHaveAttr('href', fiddle_url);
    });
    it('has the url as text content', function(){
      var subject = new GitFiddle.LinksGist(gist).link;
      expect($(subject)).toHaveText(fiddle_url);
    });
  });

  describe('#label', function(){
    it('is a table cell', function(){
      var subject = new GitFiddle.LinksGist(gist).label;
      expect($(subject)).toBe('td.label');
    });
    it('says Run Jasmine Specs', function(){
      var subject = new GitFiddle.LinksGist(gist).label;
      expect($(subject)).toHaveText('Run Jasmine Specs');
    });
  });

  describe('#build', function(){
    it('builds a table row', function(){
      var subject = new GitFiddle.LinksGist(gist);
      expect($(subject.build())).toBe('tr');
    });
    it('contains the #label', function(){
      var subject = new GitFiddle.LinksGist(gist);
      expect($(subject.build())).toContain(subject.label);
    });
    it('contains the #link', function(){
      var subject = new GitFiddle.LinksGist(gist);
      expect($(subject.build())).toContain(subject.link);
    });
  });
});