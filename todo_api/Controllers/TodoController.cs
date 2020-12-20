using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using todo_api.Models.DB;
using Microsoft.EntityFrameworkCore;
namespace todo_api.Controllers
{
    [ApiController]
    [Route("api")]
    public class TodoController : ControllerBase
    {

        private todo_dbContext _context = new todo_dbContext();

        [HttpGet]
        [Route("test")]
        public IActionResult Test()
        {
            return Ok(new { status = 200, message = "Welcome to todo app." });
        }

        [HttpGet]
        [Route("get-data")]
        public IActionResult GetData(string username)
        {
            List<TodoNote> data = _context.TodoNotes
                    .Where(i => i.CreateBy == username && i.Active == 1)
                    .ToList();
            return Ok(new { status = 200, data = data });
        }

        [HttpPost]
        [Route("add")]
        public IActionResult Add([FromBody] NoteModel data)
        {
            try
            {
                int seq = (int)(_context.TodoNotes.Select(s => s.Seq).Max() ?? 0) + 1;

                _context.TodoNotes.Add(new TodoNote()
                {
                    Seq = seq,
                    Title = data.title,
                    TextMessage = data.text,
                    CreateBy = data.create_by,
                    Active = 1
                });
                _context.SaveChanges();
                return Ok(new { status = 200, message = "Add new note success" });
            }
            catch
            {
                return Ok(new { status = 500 });
            }
        }

        [HttpPost]
        [Route("edit")]
        public IActionResult Edit([FromBody] EditNote data) {
             
             try
            {
                var item = _context.TodoNotes.Where(i => i.Id == data.id).SingleOrDefault();
                _context.Entry(item).State = EntityState.Modified;
                item.Title = data.title;
                item.TextMessage = data.text;
                _context.SaveChanges();
                return Ok(new { status = 200, message = "update success" });
            }
            catch
            {
                return Ok(new { status = 500 });
            }
        }

        [HttpGet]
        [Route("delete")]
        public IActionResult Delete(int seq)
        {
            try
            {
                var item = _context.TodoNotes.Where(i => i.Seq == seq).SingleOrDefault();
                //var item = _context.TodoNotes.Remove(new TodoNote() { Seq = seq });
                _context.Entry(item).State = EntityState.Modified;
                item.Active = 0;
                _context.SaveChanges();
                return Ok(new { status = 200, message = "delete success" });
            }
            catch
            {
                return Ok(new { status = 500 });
            }
        }

    }

}
public class NoteModel
{
    public string title { get; set; }
    public string text { get; set; }
    public string create_by { get; set; }
}

public class EditNote
{
    public int id { get; set; }
    public string title { get; set; }
    public string text { get; set; }
}