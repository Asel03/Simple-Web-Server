package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Устанавливаем маршрут для обработки запросов к файлам статики
	fs := http.FileServer(http.Dir("static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	// Устанавливаем маршрут для обработки запроса к основной странице
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "index.html")
	})

	fmt.Println("Сервер запущен на порту 8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
